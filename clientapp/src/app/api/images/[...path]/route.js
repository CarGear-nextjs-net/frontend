import { readFile } from "fs/promises";
import { NextResponse } from "next/server";
import { join } from "path";

export async function GET(request, { params }) {
  try {
    const { path } = params;
    const imagePath = join(...path);

    const imageBuffer = await readFile(imagePath);

    // Determine content type based on file extension
    const ext = path[path.length - 1].split(".").pop().toLowerCase();
    const contentType =
      {
        jpg: "image/jpeg",
        jpeg: "image/jpeg",
        png: "image/png",
        gif: "image/gif",
        webp: "image/webp",
        svg: "image/svg+xml",
      }[ext] || "image/jpeg";

    return new NextResponse(imageBuffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("Error serving image:", error);
    return new NextResponse("Image not found", { status: 404 });
  }
}
