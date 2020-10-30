import React from 'react';
import {Carousel} from 'antd';
const image1 = "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMDA4MDRfMTMz%2FMDAxNTk2NTE2MTQ1MzA2.QPazO94-TMjCz_gHmsxL1eZKR44wVc2je8PAERV3tOMg.uVkqEXLnBxqUTquOtp8-_0Lec_h8FOoZSvndHY4LSd0g.JPEG.qrd147%2F69EE455A-B983-4C98-8839-A933FA1C17FB-1258-000000BE5C0DAB19.jpg"
const image2 = "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAxOTExMjJfMTE0%2FMDAxNTc0MzUwODE3MzAy.y896LKnaD5XGgKfCA6hxutoSlvDzVuB8AXb_uzD6CiIg.Zfl4ThmJ8KcIpDFt2mVjjrlxGxHPeGUIE-a25usTFwYg.JPEG.seed_calli%2F%25BE%25C6%25C5%25A9%25B8%25B1%25B9%25AB%25B5%25E5%25B5%25EE_%25B8%25B8%25B5%25E9%25B1%25E2%25C0%25E7%25B7%25E1_%25BF%25F8%25B5%25A5%25C0%25CC_%25C3%25EB%25B9%25CC%25BC%25F6%25BE%25F7_%25BE%25BE%25B5%25E5%25C4%25B6%25B8%25AE_%25C4%25CC%25B8%25AE%25B1%25D7%25B6%25F3%25C7%25C7_%25287%2529.jpg"
const image3 = "https://search.pstatic.net/common/?autoRotate=true&quality=95&type=w750&src=http%3A%2F%2Fldb.phinf.naver.net%2F20150831_18%2F1440999986588NA3zX_JPEG%2F11582919_0.jpg"

const styles = (image) => ({
    marginTop: "37px",
    bottom: 0,
    height: '150px',
    color: 'transparent',
    textAlign: 'center',
    background: '#364d79',
    backgroundImage: 'url(' + image + ')',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover'
});
const AdsBanner = () => {
    return (
        <Carousel autoplay effect="fade">

            <div>
                <h3 style={styles(image1)}>1</h3>
            </div>
            <div>
                <h3 style={styles(image2)}>2</h3>
            </div>
            <div>
                <h3 style={styles(image3)}>3</h3>
            </div>
            {/* <div>
                <h3 style={styles(image4)}></h3>
            </div>
            <div>
                <h3 style={styles(image5)}></h3>
            </div>
            <div>
                <h3 style={styles(image6)}></h3>
            </div> */}
        </Carousel>
    )
};

export default AdsBanner;