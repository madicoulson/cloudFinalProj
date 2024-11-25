"use client"
import type { Metadata } from "next";
import React, { useState, useEffect, use } from "react";
import { useRouter, usePathname } from 'next/navigation';
import { Layout, Menu, MenuProps, Spin, theme } from "antd";
import "./globals.css";
import { useAuth } from "@/context/AuthContext";
import { UserOutlined } from "@ant-design/icons";

const { Header, Content, Footer } = Layout;
type MenuItem = Required<MenuProps>['items'][number];

const NavigationMenu = () => {
    const [pageLoading, setPageLoading] = useState(false);
    const { isLoggedIn, logout, getUsername } = useAuth();
    const router = useRouter();

    
    const pathname = (usePathname() as string).replace("/", "");
    const navigationItems: MenuItem[] = isLoggedIn ? [
        {
            key: "",
            label: 'Home',
        },
        {
            key: "data-pulls",
            label: 'Data Pulls',
        },
        {
            key: "user-menu",
            icon: <UserOutlined />,
            label: (getUsername()),
         
          children: [
            {
              key: "logout",
              label: "Log Out",
            },
          ],
        }
    ] : [
        {
            key: "",
            label: 'Home',
        },
        {
            key: "login",
            label: "Log In",
          },
    ];

    const handleNavigation = async (route: string) => {
    setPageLoading(true);
    await router.push(route);
    setPageLoading(false);
    };

    const onClick: MenuProps['onClick'] = (e) => {
    if (e.key === "logout") {
        logout();
        router.push("/"); // Redirect to home on logout
    } else {
        handleNavigation(`/${e.key}`);
    }
    };

    return (
        <Header style={{ display: 'flex', alignItems: 'center', position: "sticky", top: 0,
            zIndex: 1, width: "100%"}}>
            <Menu
            theme="dark"
            mode="horizontal"
            selectedKeys={[pathname]}
            items={navigationItems}
            style={{ flex: 1, minWidth: 0}}
            onClick={onClick}
            />
        </Header>
    )
}

export default NavigationMenu;