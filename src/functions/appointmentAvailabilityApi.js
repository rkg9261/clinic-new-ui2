import React, { useEffect, useState } from "react";

import {
  FaCalendarAlt,
  FaPlus,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

import { API, BASE_URL, GLOBAL_BRANCH_ID } from "../config/api";


export const getAvailableTimeSlots = async (date) => {

    const token =
        localStorage.getItem("token");

    const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/appointment-availability/slots?date=${date}`,
        {
            method: "GET",

            headers: {
                Authorization:
                    `Bearer ${token}`,

                "Content-Type":
                    "application/json"
            }
        }
    );

    const result =
        await response.json();

    if (!response.ok || !result.success) {

        throw new Error(
            result.message ||
            "Failed to load available slots."
        );

    }

    return result;
};