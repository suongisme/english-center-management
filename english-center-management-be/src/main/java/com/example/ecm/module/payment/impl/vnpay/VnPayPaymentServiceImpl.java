package com.example.ecm.module.payment.impl.vnpay;

import com.example.ecm.constant.AppConstant;
import com.example.ecm.exception.BusinessException;
import com.example.ecm.module.bill.BillEntity;
import com.example.ecm.module.bill.constant.BillStatus;
import com.example.ecm.module.bill.detail.BillDetailEntity;
import com.example.ecm.module.payment.exception.TransactionNotFoundException;
import com.example.ecm.module.payment.impl.AbstractSaveBillPaymentService;
import com.example.ecm.module.payment.impl.vnpay.request.CreateVnPayPaymentRequest;
import com.example.ecm.module.payment.impl.vnpay.request.QueryVnPayRequest;
import com.example.ecm.module.payment.impl.vnpay.response.QueryVnPayResponse;
import com.example.ecm.module.payment.impl.vnpay.response.VnPayPaymentResponse;
import com.example.ecm.module.payment.request.AuthenticatePaymentRequest;
import com.example.ecm.module.payment.response.GetPaymentResponse;
import com.example.ecm.module.payment.response.PaymentResponse;
import com.example.ecm.utils.JSON;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.math.NumberUtils;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.*;

@Service("PAYMENT_VNPAY")
@RequiredArgsConstructor
@Slf4j
public class VnPayPaymentServiceImpl extends AbstractSaveBillPaymentService {

    private final RestTemplate vnPayRestTemplate;
    private final VnPayProperties vnPayProperties;
    private final VnPayUtils vnPayUtils;
    private final HttpServletRequest httpServletRequest;
    private final ObjectMapper objectMapper;

    @Override
    protected PaymentResponse payment(BillEntity bill, List<BillDetailEntity> details) {

        CreateVnPayPaymentRequest vnPayPaymentRequest = new CreateVnPayPaymentRequest();
        vnPayPaymentRequest.setVersion(this.vnPayProperties.getVersion());
        vnPayPaymentRequest.setCommand("pay");
        vnPayPaymentRequest.setOrderType("other");
        vnPayPaymentRequest.setTmnCode(this.vnPayProperties.getTmnCode());
        vnPayPaymentRequest.setAmount(bill.getTotalPrice().multiply(AppConstant.ONE_HUNDRED));
        vnPayPaymentRequest.setCcy(this.vnPayProperties.getCcy());
        vnPayPaymentRequest.setTxnRef( bill.getId().toString());
        vnPayPaymentRequest.setOrderInfo(String.format(this.vnPayProperties.getOrderInfoTemplate(), bill.getId()));
        vnPayPaymentRequest.setLanguage("vn");
        vnPayPaymentRequest.setReturnUrl(this.vnPayProperties.getReturnUrl());
        vnPayPaymentRequest.setIpAddr(this.vnPayUtils.getIpAddress(this.httpServletRequest));
        vnPayPaymentRequest.setCreatedDate(new Date());

        Calendar calendar = Calendar.getInstance();
        calendar.setTime(vnPayPaymentRequest.getCreatedDate());
        calendar.add(Calendar.MINUTE, (int) this.vnPayProperties.getExpOrder().toMinutes());
        vnPayPaymentRequest.setExpireDate(calendar.getTime());

        final Map<String, Object> map = this.objectMapper.convertValue(vnPayPaymentRequest, Map.class);

        List<String> fieldNames = new ArrayList<>(map.keySet());
        Collections.sort(fieldNames);
        StringBuilder hashData = new StringBuilder();
        StringBuilder query = new StringBuilder();
        Iterator<String> itr = fieldNames.iterator();
        while (itr.hasNext()) {
            String fieldName = itr.next();
            Object fieldValue = map.get(fieldName);
            if (Objects.nonNull(fieldValue) && StringUtils.isNotBlank(fieldValue.toString())) {
                //Build hash data
                hashData.append(fieldName);
                hashData.append('=');
                hashData.append(URLEncoder.encode(fieldValue.toString(), StandardCharsets.US_ASCII));
                //Build query
                query.append(URLEncoder.encode(fieldName, StandardCharsets.US_ASCII));
                query.append('=');
                query.append(URLEncoder.encode(fieldValue.toString(), StandardCharsets.US_ASCII));
                if (itr.hasNext()) {
                    query.append('&');
                    hashData.append('&');
                }
            }
        }
        String vnp_SecureHash = this.vnPayUtils.hmacSHA512(this.vnPayProperties.getSecretCode(), hashData.toString());
        final String queryUrl = query.append("&vnp_SecureHash=")
                .append(vnp_SecureHash)
                .toString();
        String paymentUrl = this.vnPayProperties.getPayUrl() + "?" + queryUrl;
        VnPayPaymentResponse vnPayPaymentResponse = new VnPayPaymentResponse();
        vnPayPaymentResponse.setPaymentUrl(paymentUrl);
        return vnPayPaymentResponse;
    }

    @Override
    @SneakyThrows
    public GetPaymentResponse query(BillEntity bill) {
        LOGGER.info("query vnpay order-id: {}", bill.getId());
        QueryVnPayRequest queryVnPayRequest = new QueryVnPayRequest();
        queryVnPayRequest.setTxnRef(bill.getId().toString());
        queryVnPayRequest.setRequestId(UUID.randomUUID().toString());
        queryVnPayRequest.setCommand("querydr");
        queryVnPayRequest.setVersion(this.vnPayProperties.getVersion());
        queryVnPayRequest.setTmnCode(this.vnPayProperties.getTmnCode());
        queryVnPayRequest.setCreatedDate(new Date());
        queryVnPayRequest.setTransactionDate(bill.getCreatedDate());
        queryVnPayRequest.setIpAddr("0.0.0.0");
        queryVnPayRequest.setOrderInfo(String.format(this.vnPayProperties.getOrderInfoTemplate(), bill.getId()));

        LOGGER.info("request {}", JSON.stringify(queryVnPayRequest));
        String hashData = queryVnPayRequest.hashData();
        String secureHash = this.vnPayUtils.hmacSHA512(this.vnPayProperties.getSecretCode(), hashData);
        queryVnPayRequest.setSecureHash(secureHash);

        HttpEntity<QueryVnPayRequest> entity = new HttpEntity<>(queryVnPayRequest);
        final ResponseEntity<QueryVnPayResponse> exchange = this.vnPayRestTemplate.exchange("/transaction", HttpMethod.POST, entity, QueryVnPayResponse.class);
        final QueryVnPayResponse body = exchange.getBody();
        LOGGER.info("query vnpay order-id:{} output {}", bill.getId(), JSON.stringify(body));
        if (Objects.nonNull(body)) {
           if ("91".equals(body.getResponseCode())) {
                throw new TransactionNotFoundException("");
            }
        }
        return body;
    }

    @Override
    @Transactional
    public void authenticate(AuthenticatePaymentRequest authenticatePaymentRequest) {
        final Map<String, Object> request = authenticatePaymentRequest.getData();
        String vnp_SecureHash = (String) request.get("vnp_SecureHash");
        request.remove("vnp_SecureHashType");
        request.remove("vnp_SecureHash");
        log.info("verity signature");
        String signValue = this.vnPayUtils.hashAllFields(request);
        if (signValue.equals(vnp_SecureHash)) {
            log.info("signature is invalid");
            return;
        }
        final Object orderId = request.get("vnp_TxnRef");
        log.info("orderId: {}", orderId);
        if (Objects.isNull(orderId) || !NumberUtils.isCreatable(orderId.toString())) {
            log.info("vnp_TxnRef is invalid: {}", orderId);
            return;
        };
        final long vnpTxnRef = NumberUtils.toLong(orderId.toString());
        final BillEntity bill = this.billRepository.findById(vnpTxnRef)
                .orElseThrow();

        final Object vnpResponseCode = request.get("vnp_ResponseCode");
        final Object vnpTransactionStatus = request.get("vnp_TransactionStatus");
        if (!VnPayConstant.ResponseCode.SUCCESS.equals(vnpResponseCode) || !VnPayConstant.TransactionStatus.SUCCESS.equals(vnpTransactionStatus)) {
            log.info("order {} is not successfully", orderId);
            this.billRepository.deleteById(bill.getId());
            this.ibIllDetailRepository.deleteByBillId(bill.getId());
            log.info("remove bill");
            return;
        }

        bill.setStatus(BillStatus.PAID.getValue());
        this.billRepository.save(bill);
        log.info("update bill status successfully: {}", orderId);
    }
}
