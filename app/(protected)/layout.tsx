"use client"

import ProtectedLayout from "@/protected/ProtectedLayout"
import React from "react"

interface ProfileLayoutInterfaceProps {
    children: React.ReactNode
}

function ProfileLayout({ children }: ProfileLayoutInterfaceProps) {
    return (
        <ProtectedLayout>
            {children}
        </ProtectedLayout>
    )
}

export default ProfileLayout