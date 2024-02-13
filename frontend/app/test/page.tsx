"use client";
import React, { useState } from "react";

interface ButtonData {
  id: number;
  color: string;
  message: string;
}

interface ButtonStates {
  [key: string]: boolean;
}

export default function DynamicButtonExample() {
  const initialButtonStates: ButtonStates = {};

  const buttonData: ButtonData[] = [
    { id: 1, color: "teal", message: "Message for Button 1" },
    { id: 2, color: "black", message: "Message for Button 2" },
    { id: 3, color: "blue", message: "Message for Button 3" },
    // Add more button data as needed
  ];

  //equating all the buttons to false as default
  buttonData.forEach((button) => {
    initialButtonStates[`button${button.id}`] = false;
  });

  const [buttonStates, setButtonStates] =
    useState<ButtonStates>(initialButtonStates);

  const handleButtonClick = (buttonName: string) => {
    const updatedStates: ButtonStates = {};
    for (const key in buttonStates) {
      if (key !== buttonName) {
        updatedStates[key] = false;
      }
    }
    setButtonStates({
      ...updatedStates,
      [buttonName]: !buttonStates[buttonName],
    });
  };

  return (
    <div>
      <h1>Dynamic Button Example</h1>
      <div>
        <h2>Hide and Seek</h2>
        {buttonData.map((button) => (
          <div key={button.id}>
            <button
              className={`text-white bg-${button.color}`}
              onClick={() => handleButtonClick(`button${button.id}`)}
            >
              Click me to hide/show the message.
            </button>
            {buttonStates[`button${button.id}`] && (
              <p className="text-white">{button.message}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
