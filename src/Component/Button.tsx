import React, { Component, FC } from "react";
import { IButtonProps } from "./IButton";
import "./Button.css";

const Button: FC<IButtonProps> = ({ value, onClick, id, className }) => (
    <input type="button" value={value} onClick={() => onClick(value)} id={id} className={className}/>
);

export default Button