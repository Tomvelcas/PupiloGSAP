'use client';

import { useState, type ChangeEvent } from "react";

import { flavorlists } from "@/constants";

const FlavorSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const totalFlavors = flavorlists.length;

  const handleSelect = (index: number) => {
    const normalized = (index + totalFlavors) % totalFlavors;
    setActiveIndex(normalized);
  };

  const handlePrev = () => {
    handleSelect(activeIndex - 1);
  };

  const handleNext = () => {
    handleSelect(activeIndex + 1);
  };

  const handleRangeChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleSelect(Number(event.target.value));
  };

  return (
    <div className="slider-wrapper">
      <div className="flavors">
        {flavorlists.map((flavor, index) => {
          const isActive = activeIndex === index;
          return (
            <div
              key={flavor.name}
              className={`slider-card ${isActive ? "is-active" : ""}`}
              aria-hidden={!isActive}
            >
              <div
                className={`slider-card-inner ${flavor.rotation} ${flavor.classes?.container ?? ""}`}
              >
                <img
                  src={flavor.art.background}
                  alt=""
                  className={`flavor-bg ${flavor.classes?.background ?? ""}`}
                />

                <img
                  src={flavor.art.character}
                  alt=""
                  className={`drinks ${flavor.classes?.character ?? ""}`}
                />

                <img
                  src={flavor.art.elements}
                  alt=""
                  className={`elements ${flavor.classes?.elements ?? ""}`}
                />

                <h1>{flavor.name}</h1>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flavor-controls">
        <button type="button" onClick={handlePrev} aria-label="Ver mundo anterior">
          Anterior
        </button>

        <div className="range-wrapper">
          <input
            aria-label="Seleccionar mundo Pupilo"
            aria-valuemax={totalFlavors - 1}
            aria-valuemin={0}
            aria-valuenow={activeIndex}
            aria-valuetext={flavorlists[activeIndex]?.name}
            className="flavor-range"
            max={totalFlavors - 1}
            min={0}
            onChange={handleRangeChange}
            step={1}
            type="range"
            value={activeIndex}
          />
          <p className="flavor-range-label">{flavorlists[activeIndex]?.name}</p>
        </div>

        <button type="button" onClick={handleNext} aria-label="Ver mundo siguiente">
          Siguiente
        </button>
      </div>

      <div className="flavor-feed" role="list" aria-label="Mundos Pupilo">
        {flavorlists.map((flavor, index) => (
          <button
            key={flavor.name}
            type="button"
            className={`feed-item ${activeIndex === index ? "is-active" : ""}`}
            onClick={() => handleSelect(index)}
            aria-label={`Ver ${flavor.name}`}
            aria-pressed={activeIndex === index}
            role="listitem"
          >
            <span className="feed-index">{String(index + 1).padStart(2, "0")}</span>
            <span>{flavor.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default FlavorSlider;
