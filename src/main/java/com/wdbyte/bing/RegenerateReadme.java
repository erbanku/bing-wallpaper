package com.wdbyte.bing;

import java.io.IOException;
import java.util.List;

/**
 * Regenerate README.md from existing bing-wallpaper.md data
 * 
 * @author GitHub Copilot
 */
public class RegenerateReadme {

    public static void main(String[] args) throws IOException {
        // Read existing data from bing-wallpaper.md
        List<Images> imagesList = BingFileUtils.readBing();
        
        // Regenerate README.md and monthly files
        BingFileUtils.writeReadme(imagesList);
        BingFileUtils.writeMonthInfo(imagesList);
        
        System.out.println("README.md and monthly files regenerated successfully!");
        System.out.println("Total images: " + imagesList.size());
    }

}
