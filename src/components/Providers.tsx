"use client";

import { BlogProvider } from "@/lib/BlogContext";
import { ModalProvider } from "@/lib/ModalContext";
import React from "react";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <BlogProvider>
            <ModalProvider>
                {children}
            </ModalProvider>
        </BlogProvider>
    );
}
