"use client";

import React from "react";
import { Editor } from "@tinymce/tinymce-react";

interface RichTextEditorProps {
  value: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

export default function RichTextEditor({
  value,
  onChange,
  placeholder = "Enter content here...",
}: RichTextEditorProps) {
  const apiKey = process.env.NEXT_PUBLIC_TINYMCE_API_KEY || "no-api-key";

  return (
    <div style={{ width: "100%" }}>
      <Editor
        apiKey={apiKey}
        value={value}
        onEditorChange={(content) => onChange(content)}
        init={{
          height: 400,
          menubar: "file edit view insert format tools table help",
          plugins: [
            "anchor",
            "autolink",
            "charmap",
            "codesample",
            "emoticons",
            "image",
            "link",
            "lists",
            "media",
            "searchreplace",
            "table",
            "visualblocks",
            "wordcount",
          ],
          toolbar:
            "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat",
          content_style:
            "body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; font-size: 14px; }",
          branding: false,
          statusbar: true,
          placeholder,
        }}
      />
      {apiKey === "no-api-key" && (
        <div
          style={{
            padding: "12px",
            background: "#fff3cd",
            border: "1px solid #ffc107",
            borderRadius: "4px",
            marginTop: "12px",
            fontSize: "12px",
            color: "#856404",
          }}
        >
          ⚠️ TinyMCE API key not configured. Get a free key from{" "}
          <a href="https://www.tiny.cloud/" target="_blank" rel="noopener noreferrer">
            https://www.tiny.cloud/
          </a>{" "}
          and set NEXT_PUBLIC_TINYMCE_API_KEY in .env
        </div>
      )}
    </div>
  );
}
