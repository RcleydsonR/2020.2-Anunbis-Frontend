import React from 'react';
import { SelectStyle } from './styles';

export default function Select({
  text,
  id,
  name,
  register,
  options,
  backColor,
  width,
  error,
}) {
  return (
    <div className="Select">
      <SelectStyle
        id={id}
        name={name}
        ref={register}
        backColor={backColor}
        width={width}
        error={error}
      >
        <option value="" disabled selected>
          {text}
        </option>
        {options?.map((item) => (
          <option value={item.id} key={item.id}>
            {item.name}
          </option>
        ))}
      </SelectStyle>
    </div>
  );
}
