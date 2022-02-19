import { useState } from 'react';
import { IoSearch, IoFilter, IoChevronUp, IoChevronDown } from 'react-icons/io5';
import { Button } from '@nextui-org/react';

import HeaderText from '../component/HeaderText';
import MusicCard from '../component/MusicCard';

import lightColor from '../static/lightColor';
import darkColor from '../static/darkColor';

function MusicScreen({ lang, isDark }) {
  const color = isDark ? darkColor : lightColor;

  const [searchInput, setSearchInput] = useState('');
  const [isFilterPress, setFilterPress] = useState(false);

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', flexShrink: 0, gap: '20px' }}>
      <HeaderText isDark={isDark}>{{ kor: '커버곡', eng: 'Cover Song', jpn: 'カバー曲' }[lang]}</HeaderText>
      <div>
        <div style={{ width: '100%', height: '35px' }}>
          <div
            style={{
              float: 'left',
              backgroundColor: color.lightGray,
              width: searchInput ? '86%' : '100%',
              height: '100%',
              borderRadius: '8px',
              display: 'grid',
              gridTemplateColumns: '17px 1fr',
              padding: '0 13px',
              transition: 'width ease 0.3s 0s',
            }}
          >
            <IoSearch style={{ height: '100%', color: color.darkGray }} />
            <input
              style={{ border: 'none', background: 'none', height: '100%', color: color.darkGray, fontSize: '16px' }}
              placeholder={{ kor: '제목 및 가수...', eng: 'Enter the title or singer', jpn: 'タイトルと歌手を入力してください' }[lang]}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>
          <div
            className='searchButton'
            style={{
              width: searchInput ? '13%' : '0%',
              opacity: searchInput ? '100%' : '0%',
              overflow: 'hidden',
              height: '100%',
              float: 'right',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '15px',
              fontWeight: '600',
              whiteSpace: 'nowrap',
              transition: 'width ease 0.3s 0s, opacity ease 0.3s 0s',
            }}
          >
            <Button light color='error' auto>
              {{ kor: '검색', eng: 'Go', jpn: '検索' }[lang]}
            </Button>
          </div>
        </div>
        <div style={{ overflow: 'hidden', marginTop: '5px' }}>
          <div
            style={{
              height: '200px',
              borderRadius: '10px',
              backgroundColor: color.superLightGray,
              marginTop: isFilterPress ? 0 : '-200px',
              opacity: isFilterPress ? '100%' : 0,
              transition: 'margin ease-in-out 0.4s 0s, opacity ease-in-out 0.3s 0s',
            }}
          ></div>
        </div>

        <div
          style={{
            marginTop: '2px',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '15px',
            color: color.gray,
          }}
          onClick={() => setFilterPress(!isFilterPress)}
        >
          {{ kor: '필터', eng: 'Filter', jpn: 'フィルター' }[lang]}
          {isFilterPress ? <IoChevronUp style={{ marginLeft: '5px' }} /> : <IoChevronDown style={{ marginLeft: '5px' }} />}
        </div>
      </div>
      <div>
        <MusicCard lang={lang} isDark={isDark}></MusicCard>
        <MusicCard lang={lang} isDark={isDark}></MusicCard>
        <MusicCard lang={lang} isDark={isDark}></MusicCard>
        <MusicCard lang={lang} isDark={isDark}></MusicCard>
        <MusicCard lang={lang} isDark={isDark}></MusicCard>
        <MusicCard lang={lang} isDark={isDark}></MusicCard>
        <MusicCard lang={lang} isDark={isDark}></MusicCard>
        <MusicCard lang={lang} isDark={isDark}></MusicCard>
        <MusicCard lang={lang} isDark={isDark}></MusicCard>
        <MusicCard lang={lang} isDark={isDark}></MusicCard>
        <MusicCard lang={lang} isDark={isDark}></MusicCard>
        <MusicCard lang={lang} isDark={isDark}></MusicCard>
        <MusicCard lang={lang} isDark={isDark}></MusicCard>
        <MusicCard lang={lang} isDark={isDark}></MusicCard>
        <MusicCard lang={lang} isDark={isDark}></MusicCard>
        <MusicCard lang={lang} isDark={isDark}></MusicCard>
        <MusicCard lang={lang} isDark={isDark}></MusicCard>
      </div>
    </div>
  );
}

export default MusicScreen;
