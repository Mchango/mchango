'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

let interval: any;

type Card = {
  id: number;
  name: string;
  designation: string;
  content: React.ReactNode;
};

export const CardStack = ({
  items,
  offset,
  scaleFactor,
}: {
  items: Card[];
  offset?: number;
  scaleFactor?: number;
}) => {
  const CARD_OFFSET = offset || 10;
  const SCALE_FACTOR = scaleFactor || 0.06;
  const [cards, setCards] = useState<Card[]>(items);

  useEffect(() => {
    startFlipping();
  }, []);
  const startFlipping = () => {
    interval = setInterval(() => {
      setCards((prevCards: Card[]) => {
        const newArray = [...prevCards]; // create a copy of the array
        newArray.unshift(newArray.pop()!); // move the last element to the front
        return newArray;
      });
    }, 5000);

    return () => clearInterval(interval);
  };

  return (
    <div className="relative block lg:hidden  h-60 w-full">
      {cards.map((card, index) => {
        return (
          <motion.div
            key={card.id}
            className="absolute  bg-coolGray-950 bg-opacity-80 backdrop-blur-md  h-60 w-full rounded-3xl p-4 shadow-xl border border-neutral-200 dark:border-white/[0.1]  shadow-black/[0.1] dark:shadow-white/[0.05] flex flex-col justify-between"
            style={{
              transformOrigin: 'top center',
            }}
            animate={{
              top: index * -CARD_OFFSET,
              scale: 1 - index * SCALE_FACTOR, // decrease scale for cards that are behind
              zIndex: cards.length - index, //  decrease z-index for the cards that are behind
            }}
          >
            <div className="font-medium font-work  bg-clip-text text-transparent transition-all bg-gradient-to-b from-neutral-200 to-neutral-500 ">
              {card.content}
            </div>
            <div>
              <p className="text-gray-300 font-lexend font-extrabold ">
                {card.name}
              </p>
              <p className="text-neutral-400 text-[12px] sm:text-[14px] font-Azeret ">
                {card.designation}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
