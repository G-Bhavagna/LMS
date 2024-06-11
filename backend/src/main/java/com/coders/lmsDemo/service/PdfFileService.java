package com.coders.lmsDemo.service;

import com.coders.lmsDemo.enitities.PdfFile;
import com.coders.lmsDemo.repositories.PdfFileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public class PdfFileService {
    @Autowired
    private PdfFileRepository pdfFileRepository;

    public PdfFile uploadFile(String fileName, byte[] data) {
        PdfFile pdfFile = new PdfFile();
        pdfFile.setFileName(fileName);
        pdfFile.setData(data);
        return pdfFileRepository.save(pdfFile);
    }

    public PdfFile getFile(Long id) {
        return pdfFileRepository.findById(id)
                .orElseThrow();
    }

    public List<PdfFile> getAllFiles() {
        return pdfFileRepository.findAll();
    }
}
