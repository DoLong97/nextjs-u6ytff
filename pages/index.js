import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    const accelAmount = 0.01;
    const bounceAmount = 0.91;
    const video = document.getElementById('video');
    const container = document.getElementById('container');

    if (!video || !container) return;

    container.style.height = `${
      (video.duration * 2.95) / 2 + window.screen.height
    }px`;

    let scrollPos =
      (+video.duration * document.body.scrollTop) / window.screen.height;
    let targetScrollPos = +scrollPos;
    let accel = 0;

    document.addEventListener('scroll', () => {
      targetScrollPos =
        (+video.duration * document.body.scrollTop) / window.screen.height;
      accel += (+targetScrollPos - +scrollPos) * accelAmount;

      if (accel > 1) {
        accel = 1;
      }
      if (accel < -1) {
        accel = -1;
      }

      // move the video scroll position according to the acceleration and how much bouncing you selected:
      scrollPos =
        (+scrollPos + +accel) * bounceAmount +
        +targetScrollPos * (1 - bounceAmount);

      // update video playback
      video.currentTime = scrollPos;
    });
  }, []);

  return (
    <div className={styles.container} id="container">
      <Head>
        <title>Next App</title>
      </Head>

      <div className={styles.containerVideo}>
        <video
          id="video"
          className={styles.video}
          mute="true"
          pause="true"
          preload="auto"
        >
          <source
            src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            type="video/mp4"
          />
        </video>
      </div>
    </div>
  );
}
