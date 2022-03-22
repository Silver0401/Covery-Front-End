import React from "react";
import { useRouter } from "next/router";

const nav: React.FC = () => {
  const router = useRouter();

  return (
    <nav id="globalNav">
      <ul>
        <li onClick={() => router.push("/")}>Logo</li>
        <li>Light</li>
      </ul>
    </nav>
  );
};

export default nav;
