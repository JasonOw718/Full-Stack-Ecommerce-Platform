package com.ecommerce.project.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class FileServiceImp implements FileService {

    @Override
    public String uploadImage(String path, MultipartFile file) throws IOException {
        String filename = file.getOriginalFilename();
        String randomId = UUID.randomUUID().toString();
        String ext = randomId.concat(filename.substring(filename.lastIndexOf('.')));
        String fullPath = path +ext;

        File folder = new File(path);
        if(!folder.exists())
            folder.mkdir();

        Files.copy(file.getInputStream(), Paths.get(fullPath));
        return fullPath;
    }
}
