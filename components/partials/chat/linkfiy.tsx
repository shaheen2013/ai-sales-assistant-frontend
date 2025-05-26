import parse, { Text } from "html-react-parser";
import LinkifyIt from "linkify-it";
import Link from "next/link";
import React from "react";

const linkify = new LinkifyIt();

export function linkifyHTML(htmlString: string): React.ReactNode {
  return parse(htmlString, {
    replace(domNode) {
      // Handle text nodes
      if (domNode.type === "text") {
        const data = (domNode as Text).data;
        const matches = linkify.match(data);

        if (matches) {
          const result: React.ReactNode[] = [];
          let lastIndex = 0;

          matches.forEach((match, i) => {
            const { index, lastIndex: endIndex, raw } = match;

            // Text before the link
            if (index > lastIndex) {
              result.push(data.slice(lastIndex, index));
            }

            // The link
            result.push(
              <Link
                key={`link-${i}`}
                href={raw}
                target="_blank"
                rel="noopener noreferrer"
                className="!text-blue-500 underline"
              >
                {raw}
              </Link>
            );

            lastIndex = endIndex;
          });

          // Remaining text after the last link
          if (lastIndex < data.length) {
            result.push(data.slice(lastIndex));
          }

          return <>{result}</>;
        }
      }

      return undefined; // Default parsing for other nodes
    },
  });
}
