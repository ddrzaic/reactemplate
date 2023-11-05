"use client";

import { Container, Logo } from "@/ui/components";
import LoginForm from "@/ui/components/LoginForm/LoginForm";
import React from "react";

export default function Home() {
  return (
    <main>
      <Container>
        <Logo />
        <LoginForm />
      </Container>
    </main>
  );
}
