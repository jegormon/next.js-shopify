import {
  FC,
  ReactNode,
  Children,
  isValidElement,
  cloneElement,
  HTMLAttributes,
  useState,
} from "react";
import s from "./ProductSlider.module.css";
import { useKeenSlider } from "keen-slider/react";
import cn from "classnames";

interface ProductSliderProps {
  children: ReactNode;
}

const ProductSlider: FC<ProductSliderProps> = ({ children }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, slider] = useKeenSlider({
    initial: 0,
    loop: true,
    slideChanged(s) {
      setCurrentSlide(s.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

  return (
    <div className={s.root}>
      <div ref={sliderRef} className="keen-slider h-full transition-opacity">
        {loaded && slider.current && (
          <>
            <button
              onClick={slider.current?.prev}
              className={cn(s.leftControl, s.control)}
            />
            <button
              onClick={slider.current?.next}
              className={cn(s.rightControl, s.control)}
            />
          </>
        )}
        {Children.map(children, (child) => {
          if (isValidElement(child)) {
            return cloneElement(child, {
              className: `${
                child.props.className ? `${child.props.className}` : ""
              } keen-slider__slide`,
            } as HTMLAttributes<HTMLDivElement>);
          }
          return child;
        })}
      </div>
    </div>
  );
};

export default ProductSlider;
