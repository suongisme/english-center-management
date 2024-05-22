package com.example.ecm.module.resource.provider;

import com.example.ecm.module.resource.config.LocalResourceConfig;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.autoconfigure.condition.ConditionalOnBean;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;

@Service
@RequiredArgsConstructor
@ConditionalOnBean(LocalResourceConfig.ResourceProperties.class)
public class LocalResourceProvider implements IResourceProvider {

    private final LocalResourceConfig.ResourceProperties resourceProperties;

    @Override
    public String saveFile(MultipartFile multipartFile, String subFolder) throws Exception {
        File file = new File(this.resourceProperties.getPath() + subFolder + File.separator + multipartFile.getOriginalFilename());
        if (!file.exists()) {
            file.mkdirs();
        }
        multipartFile.transferTo(file);
        subFolder = subFolder.replace(File.separator, "/");
        return this.resourceProperties.getHost() + subFolder + "/" + multipartFile.getOriginalFilename();
    }
}
