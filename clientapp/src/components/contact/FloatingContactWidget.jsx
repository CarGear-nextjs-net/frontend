"use client"

import { useState } from "react"
import { Button, Stack } from "react-bootstrap"
import { MessageCircle, Phone, ChevronDown } from "lucide-react"
import "./FloatingContactWidget.css"
import ScrollToTopButton from "../ScrollToTopButton";
export default function FloatingContactWidget() {
    const [isCollapsed, setIsCollapsed] = useState(false)

    const contactOptions = [
        {
            id: "messenger",
            name: "Messenger",
            icon: <MessageCircle size={24} />,
            color: "#0084FF",
            link: "https://m.me/yourpageusername",
        },
        {
            id: "zalo",
            name: "Zalo",
            icon: (
                <span className="fw-bold" style={{ fontSize: "0.875rem" }}>
          Zalo
        </span>
            ),
            color: "#0068FF",
            link: "https://zalo.me/yourphonenumber",
        },
        {
            id: "phone",
            name: "Call Us",
            icon: <Phone size={24} />,
            color: "#25D366",
            link: "tel:+84123456789",
        },
    ]

    return (
        <div className="floating-contact-widget">
            <div className={"mb-2"}>
                <ScrollToTopButton />
            </div>
            <Stack gap={3} className="mb-2">
                {!isCollapsed &&
                    contactOptions.map((option) => (
                        <a
                            key={option.id}
                            href={option.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="contact-button"
                            style={{ backgroundColor: option.color }}
                            aria-label={option.name}
                        >
                            {option.icon}
                        </a>
                    ))}


            </Stack>

            <Button
                className={` ${!isCollapsed?"toggle-button":"contact-button"}  border-0`}
                style={{
                    backgroundColor: isCollapsed ? "#25D366" : "transparent",
                    color: isCollapsed ? "white" : "#25D366",
                    boxShadow: "0 0 6px rgba(0,0,0,0.15)", // optional cho đẹp
                }}
                onClick={() => setIsCollapsed(!isCollapsed)}
                aria-label={isCollapsed ? "Expand contact options" : "Collapse contact options"}
            >
                {isCollapsed ? <Phone size={16} /> : <ChevronDown size={16} />}
            </Button>


        </div>
    )
}
