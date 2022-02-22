import { useState, useRef, useEffect } from 'react';
import { IoPause, IoPlay, IoPlayForward, IoPlayBack, IoHeartOutline, IoHeart, IoLogoYoutube } from 'react-icons/io5';
import { MdOutlinePlaylistAdd, MdQueueMusic } from 'react-icons/md';
import { Button } from '@nextui-org/react';
import MusicPlaylist from './MusicPlaylist';

import lightColor from '../static/lightColor';
import darkColor from '../static/darkColor';

import gosegu from '../static/image/segu_300_300.webp';
import viichan from '../static/image/chan_300_300.webp';
import jururu from '../static/image/ruru_300_300.webp';
import lilpa from '../static/image/lilpa_300_300.webp';
import jingburger from '../static/image/jing_300_300.webp';
import ine from '../static/image/ine_300_300.webp';
import all from '../static/image/all_300_300.webp';

const member = {
  ine: { kor: '아이네', eng: 'INE', jpn: 'アイネ' },
  jingburger: { kor: '징버거', eng: 'JINGBURGER', jpn: 'ジンバーガー' },
  lilpa: { kor: '릴파', eng: 'LILPA', jpn: 'リルパ' },
  jururu: { kor: '주르르', eng: 'JURURU', jpn: 'ジュルル' },
  gosegu: { kor: '고세구', eng: 'Gosegu', jpn: 'ゴセグ' },
  viichan: { kor: '비챤', eng: 'VIICHAN', jpn: 'ゔぃちゃん' },
  all: { kor: '이세계 아이돌', eng: 'Isegye Idol', jpn: 'イセドル' },
  null: { kor: '', eng: '', jpn: '' },
};

const image = {
  ine,
  jingburger,
  lilpa,
  jururu,
  gosegu,
  viichan,
  all,
};

function MusicPlay({
  music,
  playlist,
  isActive,
  setActive,
  isDark,
  lang,
  playlistControl,
  setNowIdx,
  nowIdx,
  audioRef,
  isPause,
  setPause,
  audioControl,
}) {
  const color = isDark ? darkColor : lightColor;
  const [currentTime, setCurrentTime] = useState(60);
  const [percentage, setPercentage] = useState(0.0);
  const [sx, setSx] = useState(0);
  const [isLiked, setLiked] = useState(false);
  const [isPlaylistActive, setPlaylistActive] = useState(false);
  const [animStart, setAnimStart] = useState(false);

  const progressbarRef = useRef(null);

  useEffect(() => {
    setSx((window.innerWidth - progressbarRef.current.clientWidth) / 2);
  }, []);

  useEffect(() => {
    if (isActive) setPlaylistActive(false);
  }, [isActive]);

  useEffect(() => {
    setAnimStart(isPlaylistActive);
  }, [isPlaylistActive]);

  useEffect(() => {
    let timerId;
    if (!isPause) {
      timerId = setInterval(() => {
        setCurrentTime(audioRef.current.currentTime);
        if (audioRef.current.currentTime >= audioRef.current.duration) {
          audioControl.playNext();
          clearInterval(timerId);
        }
      }, 250);
    } else {
      setCurrentTime(audioRef.current.currentTime);
      clearInterval(timerId);
    }
    return () => {
      clearInterval(timerId);
    };
  }, [isPause, music]);

  useEffect(() => {
    audioRef.current.currentTime = percentage * audioRef.current.duration || 0;
    setCurrentTime(audioRef.current.currentTime);
  }, [percentage]);

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        padding: '60px 0 25px 0',
        display: 'grid',
        gridTemplateRows: '7.5fr 1.5fr 1fr',
      }}
    >
      {!isPlaylistActive && (
        <div style={{ display: 'grid', gridTemplateRows: '5fr 1.2fr 0.8fr', opacity: !animStart ? 1 : 0, transition: 'opacity ease 0.3s 0s' }}>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img
              style={{
                width: '74%',
                maxWidth: '300px',
                aspectRatio: '1/1',
                borderRadius: '6%',
                boxShadow: `0px 2px 13px -5px ${color.shadow}`,
              }}
              src={image[music.singer]}
            />
            {music.youtubeUrl && (
              <div
                style={{
                  position: 'absolute',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bottom: 5,
                  width: '50px',
                  height: '36px',
                  backgroundColor: color.bgLight,
                  boxShadow: `0px 2px 10px -6px ${color.shadow}`,
                  borderRadius: '18px',
                }}
                onClick={() => {
                  audioControl.pauseAudio();
                  window.open(music.youtubeUrl, '_blank');
                }}
              >
                <IoLogoYoutube color='#ff0000' size={20} />
              </div>
            )}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 3 }}>
            <div
              style={{
                fontSize: '21px',
                fontWeight: '400',
                color: color.textDarkBlack,
                padding: '0px 40px',
                textAlign: 'center',
                lineHeight: '1.3',
                wordBreak: 'keep-all',
              }}
            >
              {{ kor: music.titleKor, eng: music.titleEng, jpn: music.titleJpn }[lang]}
            </div>
            <div style={{ fontSize: '14px', fontWeight: '300', marginTop: '2px' }}>
              {`${member[music.singer][lang]} / ${{ kor: music.oSingerKor, eng: music.oSingerEng, jpn: music.oSingerJpn }[lang]}`}
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
            <div style={{ position: 'relative', width: '80%' }}>
              <div
                style={{
                  position: 'absolute',
                  left: `calc(${(currentTime / audioRef.current.duration) * 100}% - 5px)`,
                  top: '7px',
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  backgroundColor: eval(`color.${music.singer}`),
                  pointerEvents: 'none',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  top: '18px',
                  letterSpacing: '-0.3px',
                  fontSize: '13.5px',
                  fontWeight: '500',
                  color: eval(`color.${music.singer}`),
                }}
              >
                {`${String(Math.floor(currentTime / 60)).padStart(2, '0')}:${String(Math.floor(currentTime % 60)).padStart(2, '0')}`}
              </div>
              <div
                style={{
                  position: 'absolute',
                  right: 0,
                  top: '18px',
                  letterSpacing: '-0.3px',
                  fontSize: '13.5px',
                  fontWeight: '500',
                  color: eval(`color.${music.singer}`),
                }}
              >
                {`${String(Math.floor((audioRef.current.duration || 0) / 60)).padStart(2, '0')}:${String(
                  Math.floor((audioRef.current.duration || 0) % 60)
                ).padStart(2, '0')}`}
              </div>
              <div
                ref={progressbarRef}
                style={{ width: '100%', height: '23px', display: 'flex', alignItems: 'center' }}
                onTouchStart={(e) => {
                  let calc = (e.touches[0].clientX - sx) / progressbarRef.current.clientWidth;
                  if (calc >= 0 && calc <= 1) setPercentage(calc);
                }}
                onTouchMove={(e) => {
                  let calc = (e.touches[0].clientX - sx) / progressbarRef.current.clientWidth;
                  if (calc >= 0 && calc <= 1) setPercentage(calc);
                }}
              >
                <div
                  style={{
                    width: `${(currentTime / audioRef.current.duration) * 100}%`,
                    height: '3px',
                    backgroundColor: eval(`color.${music.singer}`),
                    borderRadius: '3px',
                    zIndex: -1,
                  }}
                />
                <div style={{ flex: 1, height: '3px', backgroundColor: color.lightGray, zIndex: -1, borderRadius: '3px' }} />
              </div>
            </div>
          </div>
        </div>
      )}
      {isPlaylistActive && (
        <div style={{ overflow: 'auto', opacity: animStart ? 1 : 0, transition: 'opacity ease 0.3s 0s' }}>
          <MusicPlaylist
            playlistControl={playlistControl}
            playlist={playlist}
            isActive={isActive}
            setActive={setActive}
            isDark={isDark}
            lang={lang}
            setNowIdx={setNowIdx}
            nowIdx={nowIdx}
          />
        </div>
      )}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 30 }}>
        <Button
          style={{ height: '70%' }}
          size='xs'
          auto
          light
          icon={<IoPlayBack size={40} color={eval(`color.${music.singer}`)} onClick={() => audioControl.playPrev()} />}
        />
        <Button
          onClick={() => setPause(!isPause)}
          style={{ height: '70%' }}
          size='xs'
          auto
          light
          icon={
            audioRef.current?.paused ? (
              <IoPlay size={60} color={eval(`color.${music.singer}`)} />
            ) : (
              <IoPause size={60} color={eval(`color.${music.singer}`)} />
            )
          }
        />
        <Button
          style={{ height: '70%' }}
          size='xs'
          auto
          light
          icon={<IoPlayForward size={40} color={eval(`color.${music.singer}`)} onClick={() => audioControl.playNext()} />}
        />
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 60,
          opacity: '70%',
        }}
      >
        <Button style={{ height: '70%' }} size='xs' auto light icon={<MdOutlinePlaylistAdd size={26} color={eval(`color.${music.singer}`)} />} />
        <Button
          onClick={() => setLiked(!isLiked)}
          style={{ height: '70%' }}
          size='xs'
          auto
          light
          icon={
            isLiked ? <IoHeart color={eval(`color.${music.singer}`)} size={26} /> : <IoHeartOutline size={26} color={eval(`color.${music.singer}`)} />
          }
        />
        <Button
          onClick={() => setPlaylistActive(!isPlaylistActive)}
          style={{ height: '70%' }}
          size='xs'
          auto
          light
          icon={<MdQueueMusic size={26} color={eval(`color.${music.singer}`)} />}
        />
      </div>
    </div>
  );
}

export default MusicPlay;
