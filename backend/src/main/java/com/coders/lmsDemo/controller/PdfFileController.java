package com.coders.lmsDemo.controller;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

import com.coders.lmsDemo.enitities.PdfFile;
import com.coders.lmsDemo.service.PdfFileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

@CrossOrigin(origins = "http://localhost:3000")
@Controller
@RequestMapping("/files")
public class PdfFileController {
    @Autowired
    private PdfFileService pdfFileService;

    @PostMapping("/upload")
    public ResponseEntity<PdfFile> uploadFile(@RequestParam("file") MultipartFile file) throws IOException {
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        PdfFile pdfFile = pdfFileService.uploadFile(fileName, file.getBytes());
        return ResponseEntity.ok().body(pdfFile);
    }

    @GetMapping("/upload")
    public String upload() {
        return "upload";
    }

    @GetMapping("/{id}")
    public ResponseEntity<byte[]> getFile(@PathVariable Long id) {
        PdfFile pdfFile = pdfFileService.getFile(id);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + pdfFile.getFileName() + "\"")
                .contentType(MediaType.APPLICATION_PDF)
                .body(pdfFile.getData());
    }

    @GetMapping("/all")
    public ModelAndView listFiles() {
        List<PdfFile> pdfFiles = pdfFileService.getAllFiles();
        ModelAndView modelAndView = new ModelAndView("listFiles");
        modelAndView.addObject("files", pdfFiles);
        return modelAndView;
    }
}
