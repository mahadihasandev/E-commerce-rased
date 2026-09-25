"use client";

import React from "react";

interface BlockChild {
  text?: string;
  [key: string]: unknown;
}

interface BlockItem {
  _type?: string;
  style?: string;
  children?: BlockChild[];
  [key: string]: unknown;
}

interface Props {
  content: unknown;
  className?: string;
}

/**
 * Universal rich text renderer replacing PortableText.
 * Handles strings, HTML from Laravel WYSIWYG editors, arrays, and structured blocks.
 */
export const RichTextRenderer: React.FC<Props> = ({ content, className = "" }) => {
  if (!content) return null;

  // If string: check if HTML or plain text
  if (typeof content === "string") {
    // If it contains HTML tags
    if (/<[a-z][\s\S]*>/i.test(content)) {
      return (
        <div
          className={`prose prose-blue max-w-none text-gray-700 leading-relaxed ${className}`}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      );
    }
    return <p className={`text-base leading-relaxed text-gray-700 ${className}`}>{content}</p>;
  }

  // If array of blocks (e.g. portable/custom block format)
  if (Array.isArray(content)) {
    return (
      <div className={`space-y-4 text-base leading-relaxed text-gray-700 ${className}`}>
        {content.map((block: BlockItem | string, idx) => {
          if (typeof block === "object" && block !== null) {
            if (block._type === "block" || block.children) {
              const text = block.children?.map((c) => c.text).join("") || "";
              if (block.style === "h2") {
                return <h2 key={idx} className="text-2xl font-bold text-gray-900 mt-6 mb-3">{text}</h2>;
              }
              if (block.style === "h3") {
                return <h3 key={idx} className="text-xl font-semibold text-gray-900 mt-5 mb-2">{text}</h3>;
              }
              if (block.style === "blockquote") {
                return (
                  <blockquote key={idx} className="border-l-4 border-shop_light_blue pl-4 py-1 italic text-gray-600 bg-blue-50/50 rounded-r">
                    {text}
                  </blockquote>
                );
              }
              return <p key={idx} className="my-2">{text}</p>;
            }
          }
          if (typeof block === "string") {
            return <p key={idx}>{block}</p>;
          }
          return null;
        })}
      </div>
    );
  }

  // Fallback
  return <div className={className}>{String(content)}</div>;
};

export default RichTextRenderer;
