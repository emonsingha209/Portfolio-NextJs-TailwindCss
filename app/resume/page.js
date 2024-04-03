"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { IoMdDownload } from "react-icons/io";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

export default function Resume() {
  const [numPages, setNumPages] = useState(null);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div className="grid w-full pt-5 overflow-auto bg-background place-items-center">
      <div className="flex justify-start w-full mb-5 font-bold uppercase md:justify-center font-oswald">
        <Button asChild>
          <a href="/resume/resume.pdf" className="font-bold" download="Emon-Singha-Resume">
            Download Resume<IoMdDownload className="w-4 h-4 ml-2" />
          </a>
        </Button>
      </div>

      <Document file="/resume/resume.pdf" onLoadSuccess={onDocumentLoadSuccess}>
        {Array.from(new Array(numPages), (_, index) => (
          <div key={index}>
            <Page key={index + 1} pageNumber={index + 1} />
            <p className="p-2 text-end">
              Page {index + 1} of {numPages}
            </p>
          </div>
        ))}
      </Document>
    </div>
  );
}
