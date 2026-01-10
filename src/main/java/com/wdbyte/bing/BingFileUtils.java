package com.wdbyte.bing;

import java.io.BufferedWriter;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.LinkedHashMap;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * 文件操作工具类
 *
 * @author niujinpeng
 * @date 2021/02/08
 * @link https://github.com/erbanku
 */
public class BingFileUtils {

    private static Path README_PATH = Paths.get("README.md");
    private static Path BING_PATH = Paths.get("bing-wallpaper.md");

    private static Path MONTH_PATH = Paths.get("picture/");


    /**
     * 读取 bing-wallpaper.md
     *
     * @return
     * @throws IOException
     */
    public static List<Images> readBing() throws IOException {
        if (!Files.exists(BING_PATH)) {
            Files.createFile(BING_PATH);
        }
        List<String> allLines = Files.readAllLines(BING_PATH, StandardCharsets.UTF_8);
        List<Images> imgList = new ArrayList<>(allLines.size());
        imgList.add(new Images());
        for (int i = 1; i < allLines.size(); i++) {
            String s = allLines.get(i).trim();
            if (s.isEmpty()) {
                continue;
            }
            int descEnd = s.indexOf("]");
            int urlStart = s.lastIndexOf("(") + 1;

            String date = s.substring(0, 10);
            String desc = s.substring(14, descEnd);
            String url = s.substring(urlStart, s.length() - 1);
            imgList.add(new Images(desc, date, url));
        }
        return imgList;
    }

    /**
     * 写入 bing-wallpaper.md
     *
     * @param imgList
     * @throws IOException
     */
    public static void writeBing(List<Images> imgList) throws IOException {
        if (!Files.exists(BING_PATH)) {
            Files.createFile(BING_PATH);
        }
        try (BufferedWriter writer = Files.newBufferedWriter(BING_PATH, StandardCharsets.UTF_8)) {
            writer.write("## Bing Wallpaper");
            writer.newLine();
            for (Images images : imgList) {
                writer.write(images.formatMarkdown());
                writer.newLine();
                writer.newLine();
            }
        }
    }

    /**
     * 读取 README.md
     *
     * @return
     * @throws IOException
     */
    public static List<Images> readReadme() throws IOException {
        if (!Files.exists(README_PATH)) {
            Files.createFile(README_PATH);
        }
        List<String> allLines = Files.readAllLines(README_PATH, StandardCharsets.UTF_8);
        List<Images> imgList = new ArrayList<>();
        for (int i = 3; i < allLines.size(); i++) {
            String content = allLines.get(i);
            if (content.isEmpty()) {
                continue;
            }
            String[] parts = content.split("\\|");
            for (String s : parts) {
                if (s.isEmpty()) {
                    continue;
                }
                int dateStartIndex = s.indexOf("[", 3);
                if (dateStartIndex == -1) {
                    continue;
                }
                dateStartIndex++;
                int urlStartIndex = s.indexOf("(", 4);
                if (urlStartIndex == -1) {
                    continue;
                }
                urlStartIndex++;
                // Check bounds for both date and url extraction
                if (dateStartIndex + 10 > s.length() || urlStartIndex + 1 > s.length()) {
                    continue;
                }
                String date = s.substring(dateStartIndex, dateStartIndex + 10);
                String url = s.substring(urlStartIndex, s.length() - 1);
                imgList.add(new Images(null, date, url));
            }
        }
        return imgList;
    }

    /**
     * 写入 README.md
     *
     * @param imgList
     * @throws IOException
     */
    public static void writeReadme(List<Images> imgList) throws IOException {
        if (!Files.exists(README_PATH)) {
            Files.createFile(README_PATH);
        }
        
        // Pre-filter valid images once
        List<Images> validImages = new ArrayList<>();
        for (Images img : imgList) {
            if (img != null && img.getUrl() != null && img.getDate() != null) {
                validImages.add(img);
            }
        }
        
        if (validImages.isEmpty()) {
            return; // Nothing to write
        }
        
        List<Images> imagesList = validImages.subList(0, Math.min(30, validImages.size()));
        writeFile(README_PATH, imagesList, null);

        try (BufferedWriter writer = Files.newBufferedWriter(README_PATH, StandardCharsets.UTF_8, StandardOpenOption.APPEND)) {
            writer.newLine();
            writer.newLine();
            // Archive
            writer.write("### Archive");
            writer.newLine();
            writer.newLine();
            
            // Collect unique months efficiently using LinkedHashSet to preserve order
            List<String> dateList = new ArrayList<>();
            Set<String> seenMonths = new LinkedHashSet<>();
            for (Images images : imgList) {
                if (images.getDate() != null) {
                    String month = images.getDate().substring(0, 7);
                    seenMonths.add(month);
                }
            }
            dateList.addAll(seenMonths);
            
            int i = 0;
            for (String date : dateList) {
                String link = String.format("[%s](/picture/%s/) | ", date, date);
                writer.write(link);
                i++;
                if (i % 8 == 0) {
                    writer.newLine();
                }
            }
        }
    }


    /**
     * 按月份写入图片信息
     *
     * @param imgList
     * @throws IOException
     */
    public static void writeMonthInfo(List<Images> imgList) throws IOException {
        Map<String, List<Images>> monthMap = convertImgListToMonthMap(imgList);
        for (Map.Entry<String, List<Images>> entry : monthMap.entrySet()) {
            String key = entry.getKey();
            Path path = MONTH_PATH.resolve(key);
            if (!Files.exists(path)) {
                Files.createDirectories(path);
            }
            path = path.resolve("README.md");
            writeFile(path, entry.getValue(), key);
        }
    }

    /**
     * 转换图片列表为月度 Map
     *
     * @param imagesList
     * @return
     */
    public static Map<String, List<Images>> convertImgListToMonthMap( List<Images> imagesList){
        Map<String, List<Images>> monthMap = new LinkedHashMap<>();
        for (Images images : imagesList) {
            if (images.getUrl() == null){
                continue;
            }
            String key = images.getDate().substring(0, 7);
            monthMap.computeIfAbsent(key, k -> new ArrayList<>()).add(images);
        }
        return monthMap;
    }

    /**
     * 写入图片列表到指定位置
     *
     * @param path
     * @param imagesList
     * @param name
     * @throws IOException
     */
    private static void writeFile(Path path, List<Images> imagesList, String name) throws IOException {
        if (!Files.exists(path)) {
            Files.createFile(path);
        }
        String title = "## Bing Wallpaper";
        if (name != null) {
            title = "## Bing Wallpaper (" + name + ")";
        }
        try (BufferedWriter writer = Files.newBufferedWriter(path, StandardCharsets.UTF_8)) {
            // Only add project description for main README (when name is null)
            if (name == null) {
                writer.write("# Bing Wallpaper");
                writer.newLine();
                writer.newLine();
                writer.write("Daily Bing wallpaper collection. Automatically updated with beautiful images from around the world.");
                writer.newLine();
                writer.newLine();
                writer.write("---");
                writer.newLine();
                writer.newLine();
            } else {
                writer.write(title);
                writer.newLine();
                writer.newLine();
            }
            
            writer.write(imagesList.get(0).toLarge());
            writer.newLine();
            writer.newLine();
            writer.write("---");
            writer.newLine();
            writer.newLine();
            writer.write("### Recent Wallpapers");
            writer.newLine();
            writer.newLine();
            writer.write("|      |      |      |");
            writer.newLine();
            writer.write("| :----: | :----: | :----: |");
            writer.newLine();
            int i = 1;
            for (Images images : imagesList) {
                writer.write("|" + images.toString());
                if (i % 3 == 0) {
                    writer.write("|");
                    writer.newLine();
                }
                i++;
            }
            if (i % 3 != 1) {
                writer.write("|");
            }
        }
    }

}
