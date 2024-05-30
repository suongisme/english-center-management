package com.example.ecm.module.bill.impl;

import com.example.ecm.model.ApiBody;
import com.example.ecm.module.bill.IBillRepository;
import com.example.ecm.module.bill.IBillService;
import com.example.ecm.module.bill.detail.IBIllDetailRepository;
import com.example.ecm.module.bill.request.SearchBillRequest;
import com.example.ecm.module.bill.response.IGetDetailBillResponse;
import com.example.ecm.module.bill.response.IGetUserBillResponse;
import com.example.ecm.utils.AuthenticationUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BillServiceImpl implements IBillService {

    private final IBillRepository billRepository;
    private final IBIllDetailRepository ibIllDetailRepository;

    @Override
    public ApiBody getUserBill(SearchBillRequest searchBillRequest) {
        final String username = AuthenticationUtil.getUsername();
        searchBillRequest.setUsername(username);
        final List<IGetUserBillResponse> response = this.billRepository.searchBy(searchBillRequest);
        return ApiBody.of(response);
    }

    @Override
    public ApiBody getDetailBill(Long billId) {
        final List<IGetDetailBillResponse> response = this.ibIllDetailRepository.getByBillId(billId);
        return ApiBody.of(response);
    }

}
