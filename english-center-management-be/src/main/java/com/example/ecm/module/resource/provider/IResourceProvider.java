package com.example.ecm.module.resource.provider;

import org.springframework.web.multipart.MultipartFile;

public interface IResourceProvider {

    String saveFile(MultipartFile multipartFile, String subFolder) throws Exception;
}
