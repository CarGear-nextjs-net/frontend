"use client";
import { useTranslations } from "next-intl";
import Quill from "quill";
import "quill/dist/quill.bubble.css";
import "quill/dist/quill.snow.css";
import { forwardRef, useEffect, useLayoutEffect, useRef } from "react";
import { ICONQILLEDITOR } from "./const";
import "./index.css";
import { ImageUploader, PdfUploader, QuillResizeImage, VideoUploader } from "./plugins";
import ImageBlot from "./plugins/ImageUploader/ImageBlot";
import VideoBlot from "./plugins/VideoUploader/VideoBlot";

const Parchment = Quill.import("parchment");

const AltAttributor = new Parchment.Attributor("alt", "alt");
Quill.register(AltAttributor, true);

// Register Custom Plugin
Quill.register("modules/pdfUploader", PdfUploader);

Quill.register("modules/videoUploader", VideoUploader);

Quill.register("modules/resize", QuillResizeImage);

Quill.register("modules/image", ImageUploader);

Quill.register(VideoBlot);

Quill.register(ImageBlot);

// Change icons
const icons = Quill.import("ui/icons");
icons["pdf"] = ICONQILLEDITOR["pdf"];
icons["videoUploader"] = ICONQILLEDITOR["videoUploader"];
icons["undo"] = ICONQILLEDITOR["undo"];
icons["redo"] = ICONQILLEDITOR["redo"];

const toolbarOptions = [
  [{ font: [] }],
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ size: ["small", false, "large", "huge"] }],
  ["bold", "italic", "underline", "strike"],
  [{ color: [] }, { background: [] }],
  [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
  [{ indent: "-1" }, { indent: "+1" }],
  [{ align: [] }],
  ["clean"],
  ["link", { pdf: "Upload Pdf" }, "video", "videoUploader", "image"],
  ["redo", "undo"],
];

const QuillEditor = forwardRef(
  (
    {
      readOnly,
      defaultValue,
      defaultValueHtml,
      onTextChange,
      onSelectionChange,
      height,
      width,
      className = "",
      onChange,
      onBlur,
      toolbarOptionsProps,
      nextElement,
    },
    ref
  ) => {
    const containerRef = useRef < HTMLDivElement > null;
    const defaultValueRef = useRef(defaultValue);
    const onTextChangeRef = useRef(onTextChange);
    const onSelectionChangeRef = useRef(onSelectionChange);
    const onChangeRef = useRef(onChange);
    const t = useTranslations();

    useLayoutEffect(() => {
      onTextChangeRef.current = onTextChange;
      onSelectionChangeRef.current = onSelectionChange;
      onChangeRef.current = onChange;
    }, [ref]);

    useEffect(() => {
      const container = containerRef.current;

      if (!container) return;

      let wrapperEditor = container.querySelector("#editor");

      if (!wrapperEditor) {
        wrapperEditor = container.ownerDocument.createElement("div");
        wrapperEditor.id = "editor";
        wrapperEditor.className = className;
        container.appendChild(wrapperEditor);
      }

      let quill = Quill.find(wrapperEditor);

      if (!quill) {
        quill = new Quill(wrapperEditor, {
          bounds: "#editor",
          theme: readOnly ? "bubble" : "snow",
          formats: [
            "font",
            "color",
            "background",
            "header",
            "bold",
            "italic",
            "underline",
            "strike",
            "list",
            "link",
            "image",
            "video",
            "size",
            "alt",
            "align",
            "indent",
            "size",
          ],
          modules: {
            toolbar: {
              container: [...(toolbarOptionsProps || toolbarOptions)],
              handlers: {
                pdf: () => {},
                videoUploader: () => {},
                image: () => {},
                redo() {
                  quill?.history.redo();
                },
                undo() {
                  quill?.history.undo();
                },
              },
            },
            pdfUploader: {
              t: t,
            },
            videoUploader: {
              t: t,
            },
            image: {
              t: t,
            },
            resize: {
              locale: {},
            },
            history: { delay: 500, maxStack: 500, userOnly: true },
          },
        });

        quill.enable(!readOnly);

        if (ref) {
          ref.current = quill;
        }

        quill.root.addEventListener(
          "blur",
          () => {
            onBlur?.();
          },
          { capture: true }
        );

        quill.root.addEventListener(
          "drop",
          (event) => {
            if (event.dataTransfer) {
              const types = Array.from(event.dataTransfer.types);
              if (types.includes("Files")) {
                event.preventDefault();
                event.stopPropagation();
              }
            }
          },
          { capture: true }
        );

        quill.root.addEventListener(
          "paste",
          (event) => {
            const clipboardData = event.clipboardData;
            if (!clipboardData) return;
            const items = Array.from(clipboardData.items);
            for (const item of items) {
              if (item.type.startsWith("image/")) {
                event.preventDefault();
                event.stopPropagation();
              }
              break;
            }
          },
          { capture: true }
        );

        // quill.on(Quill.events.TEXT_CHANGE, (...args) => {
        //   onTextChangeRef.current?.(...args);
        // });
        quill.on(Quill.events.SELECTION_CHANGE, (...args) =>
          onSelectionChangeRef.current?.(...args)
        );
        quill.on(Quill.events.TEXT_CHANGE, () => {
          function normalizeHtmlAttributes(html) {
            return html
              .replace(/class="([^"]+)"/g, (_match, classNames) => {
                const sortedClassNames = classNames.split(/\s+/).filter(Boolean).sort().join(" ");

                return `class="${sortedClassNames}"`;
              })
              .replace(/style="([^"]+)"/g, (_match, styles) => {
                const sortedStyles = styles
                  .split(";")
                  .map((s) => s.trim())
                  .filter(Boolean)
                  .sort()
                  .join("; ");

                return `style="${sortedStyles}"`;
              });
          }

          let html = quill?.getSemanticHTML();
          html = normalizeHtmlAttributes(html || "");
          onChangeRef.current?.(html);
        });

        const editorToolbar = document.querySelector(".ql-toolbar");
        if (editorToolbar) {
          editorToolbar.classList.add("rounded-t-lg");
        }
      }

      const handleTabNavigation = (event) => {
        if (event.key === "Tab") {
          event.preventDefault();

          if (nextElement?.current?.focus) {
            nextElement.current.focus();
          }
        }
      };

      quill.root.addEventListener("keydown", handleTabNavigation, { capture: true });

      if (defaultValueRef.current) {
        quill.setContents(defaultValueRef.current);
      } else if (defaultValueHtml) {
        // quill.root.innerHTML = defaultValueHtml;
        quill.clipboard.addMatcher("iframe", (node, delta) => {
          const videoSrc = node.getAttribute("src");
          let widthVideo = parseInt(node.getAttribute("width")) || 0;
          let heightVideo = parseInt(node.getAttribute("height")) || 0;

          if (widthVideo > window.innerWidth - 30) {
            const ratio = widthVideo / heightVideo;
            widthVideo = window.innerWidth - 30;
            heightVideo = widthVideo / ratio;
          }

          delta.ops = [
            {
              insert: { video: videoSrc },
              attributes: { width: widthVideo || "auto", height: heightVideo || "auto" },
            },
            { insert: "\n" },
          ];

          return delta;
        });

        quill.clipboard.addMatcher("img", (node, delta) => {
          const imgSrc = node.getAttribute("src");
          const imgAlt = node.getAttribute("alt");
          let widthImg = parseInt(node.getAttribute("width")) || 0;
          let heightImg = parseInt(node.getAttribute("height")) || 0;

          if (widthImg > window.innerWidth - 30) {
            const ratio = widthImg / heightImg;
            widthImg = window.innerWidth - 30;
            heightImg = widthImg / ratio;
          }

          delta.ops = [
            {
              insert: { image: imgSrc },
              attributes: {
                style: `${widthImg == 0 ? "" : `width:${widthImg}px;`} ${heightImg == 0 ? "" : `height:${heightImg}px;`}`,
                alt: imgAlt,
              },
            },
            { insert: "\n" },
          ];
          return delta;
        });

        quill.clipboard.addMatcher("a", (node, delta) => {
          const href = node.getAttribute("href");
          delta.ops = [
            {
              insert: node.textContent,
              attributes: { link: href },
            },
            { insert: "\n" },
          ];
          return delta;
        });

        const contentDelta = quill.clipboard.convert(
          { html: defaultValueHtml },
          { list: ["ordered", "bullet"] }
        );
        quill.setContents(contentDelta);
      }
      if (height) {
        const heightEditor = typeof height === "number" ? `${height}px` : height;
        wrapperEditor.style.minHeight = heightEditor;
        const editorQuillElement = document.querySelector(".ql-editor");
        if (editorQuillElement) {
          editorQuillElement.style.minHeight = heightEditor;
        }
      }
      if (width) {
        const widthEditor = typeof width === "number" ? `${width}px` : width;
        wrapperEditor.style.maxWidth = widthEditor;
        const editorQuillElement = document.querySelector(".ql-editor");
        if (editorQuillElement) {
          editorQuillElement.style.maxWidth = widthEditor;
        }
      }

      if (readOnly) {
        const editorQuillElement = document.querySelector(".ql-editor");
        editorQuillElement.style.padding = "0px";
      }

      wrapperEditor.addEventListener(
        "focus",
        () => {
          if (containerRef?.current && !readOnly) {
            containerRef?.current?.classList?.add("ring-2");
          }
        },
        { capture: true }
      );

      wrapperEditor.addEventListener(
        "blur",
        () => {
          if (containerRef?.current && !readOnly) {
            containerRef?.current?.classList?.remove("ring-2");
          }
        },
        { capture: true }
      );

      if (containerRef?.current && !readOnly) {
        containerRef?.current?.classList?.add("focus:ring-2", "!ring-black", "rounded-md");
      }
    }, [ref, defaultValueHtml, className, height, width, readOnly, toolbarOptions]);

    return <div ref={containerRef} tabIndex={0} />;
  }
);

QuillEditor.displayName = "QuillEditor";

export default QuillEditor;
