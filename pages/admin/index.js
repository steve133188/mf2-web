import Head from 'next/head'
import Image from 'next/image'
import { SearcBox} from "../../components/Input";
import {
    CancelButton,
    SelectButton,
    AddButton,
    ConfirmButton
} from "../../components/Button";
import {useRouter} from "next/router";
import {PaginationControlled} from "../../components/Pagination";
import {useState, useEffect} from "react";

import {useTheme} from "@mui/material/styles";
import {InnerSidebar} from "../../components/InnerSidebar";
import { Checkbox } from '../../components/Checkbox';

import * as userApi from "../../api/UserAPI";


export default function Admin() {
    const router = useRouter()
    router.push("/admin/Role")


    return (
        <div>
            <div className="admin_layout">
              </div>
        </div>
    )
}