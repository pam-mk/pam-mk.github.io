# Conference photo gallery

The gallery is at `/gallery/`, linked from About → Photo Gallery.

Add photographs to the page bundle using the date they belong to:

```
content/gallery/images/2026-10-15/001.jpg
content/gallery/images/2026-10-15/002.jpg
content/gallery/images/2026-10-16/001.jpg
content/gallery/images/2026-10-17/001.jpg
```

Use JPEG, PNG or WebP files, already oriented correctly. Convert HEIC files before adding them. Sort filenames with zero-padded numbers to control display order. Add new batches to the same day's folder with unique filenames. The gallery automatically includes every image in that folder.

Hugo automatically corrects camera EXIF orientation before generating WebP previews up to 640 × 640 pixels (quality 78) and larger views up to 1600 × 1600 pixels (quality 82), preserving proportions. The download icon on each photograph and the Download button in the viewer save the imported JPEG copy (up to 1600 pixels), while previews and larger views use WebP. Keep archival originals outside the site repository; Hugo page resources may also be published at their own URLs. Prefer importing resized, metadata-free copies rather than camera originals.

Days and their order are defined in `data/gallery.json`. To add another day, add a date, title and label there, then add its photographs in the matching folder. Dates are fixed so the albums keep their meaning after the conference. An empty day displays a short message until photographs are available.

Selecting a photograph opens the viewer. Previous/Next and the left/right arrow keys browse within the selected day. Escape or Close returns to the grid. Without JavaScript, each preview links directly to its larger image.

The blue day headings are native expandable panels, initially closed. Click a heading (or use Enter/Space with keyboard focus) to collapse or expand that day. Direct day links open their target panel.

Grid previews use equal landscape frames (3:2). Portrait photographs fit inside these frames without cropping or stretching. Opening a photograph displays its full natural proportions.
