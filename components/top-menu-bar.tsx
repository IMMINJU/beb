"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UploadModal from "./upload-modal";

export default function TopMenuBar() {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between bg-[#3c3c3c] px-4 py-1 text-xs">
        <div className="flex items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <span className="mr-4 hover:bg-[#505050] px-2 py-1 rounded cursor-pointer">
                File
              </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-[#252526] border-[#3c3c3c] text-[#cccccc]">
              <DropdownMenuItem
                onClick={() => setIsUploadModalOpen(true)}
                className="hover:bg-[#37373d]"
              >
                <Plus className="h-4 w-4 mr-2" />
                New Tweet
              </DropdownMenuItem>
              {/* <DropdownMenuItem className="hover:bg-[#37373d]">
                <FileIcon className="h-4 w-4 mr-2" />
                Open File...
              </DropdownMenuItem> */}
            </DropdownMenuContent>
          </DropdownMenu>
          <span className="mr-4 px-2 py-1 rounded">Edit</span>
          <span className="mr-4 px-2 py-1 rounded">View</span>
          <span className="mr-4 px-2 py-1 rounded">Go</span>
          <span className="mr-4 px-2 py-1 rounded">Run</span>
          <span className="mr-4 px-2 py-1 rounded">Terminal</span>
          <span className="px-2 py-1 rounded">Help</span>
        </div>
      </div>

      <UploadModal
        open={isUploadModalOpen}
        onOpenChange={setIsUploadModalOpen}
      />
    </>
  );
}
