import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { GameType } from '@/constants/game';

interface PropsType {
  game?: GameType;
  name?: string;
  value: string;
  change?: (value: string) => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: (event?: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

// noinspection LessResolvedByNameOnly
const Root = styled.div`
  .rel; .bgc(#DDD); .br(12); .pointer; .crop;
  input { .hide; }
  label { .block; .pointer;
    .filter-btn-ico { .br(12); .crop; }
  }
  &.ready { .o(0.4); }
  &.ready {
    label { cursor: not-allowed; }
  }
`;

const GameFilterBtn = ({ name = 'game-filter', game, value, change, onChange, onClick }: PropsType) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    if (onChange) onChange(event);
    if (change) change(value);
  };

  return (
    <Root className={`${game?.notYet ? 'ready' : ''}`} onClick={onClick}>
      <label>
        <input type="radio" name={name} value={value} onChange={handleChange} disabled={game?.notYet} />
        <div className="filter-btn-ico">
          <Image src={`/imgs/game/btn/${value}.svg`} width={44} height={44} loading="lazy" quality={100} />
        </div>
      </label>
    </Root>
  );
};

export default GameFilterBtn;
