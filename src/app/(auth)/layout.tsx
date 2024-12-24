import React from "react";

export default function BasicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>
    {children}
    </div>;
};

