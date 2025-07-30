import { existsSync } from "fs";
import { readFile } from "fs/promises";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const { path } = params;

    // Decode the path to handle special characters
    const decodedPath = decodeURIComponent(path.join("/"));

    // Construct the full path to the backend database-image directory
    const backendImagePath = `C:/Users/nguye/Desktop/Project/backend/database-image/${decodedPath}`;

    // Security check: prevent directory traversal
    if (decodedPath.includes("..") || decodedPath.includes("\\")) {
      return new NextResponse("Invalid path", { status: 400 });
    }

    // Check if file exists
    if (!existsSync(backendImagePath)) {
      return new NextResponse("File not found", { status: 404 });
    }

    // Read the image file
    const imageBuffer = await readFile(backendImagePath);

    // Determine content type based on file extension
    const ext = decodedPath.split(".").pop().toLowerCase();
    const contentType =
      {
        jpg: "image/jpeg",
        jpeg: "image/jpeg",
        png: "image/png",
        gif: "image/gif",
        webp: "image/webp",
        svg: "image/svg+xml",
        bmp: "image/bmp",
      }[ext] || "image/jpeg";

    return new NextResponse(imageBuffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("Error serving database image:", error);
    return new NextResponse(`Error: ${error.message}`, { status: 500 });
  }
}
