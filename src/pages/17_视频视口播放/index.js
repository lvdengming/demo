/**
 * author: lvdengming@foxmail.com
 * date: 2024-11-15
 */

// 带声音视频自动播放受用户活动因素的影响
const observer = new IntersectionObserver(
    (entries) => {
        const entry = entries[0];
        if (!entry) {
            return;
        }

        const video = entry.target;
        if (entry.isIntersecting) {
            video.play();
        } else {
            video.pause();
        }
    },
    {
        threshold: 0.5,
    }
);

const video = document.querySelector('video');
observer.observe(video);
