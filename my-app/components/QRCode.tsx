import QRCode from "qrcode.react";
import { useState } from "react";
import styled from "styled-components";
import { Icon } from "./common/Icon";

const Label = styled.div`
  color: #ec7359;
  font-size: 12px;
  line-height: 16px;
  padding-bottom: 2px;
  text-align: center;
`;

const QRContainer = styled.div`
  width: 162px;
  height: 162px;
  background-color: #fff;
  box-shadow: 0 0 15px 0 rgb(0 0 0 / 15%);
  border-radius: 10px;
  top: -10px;
  left: 66px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
  flex-direction: column;
  position: absolute;

  &::before {
    content: "";
    position: absolute;
    left: -10px;
    width: 20px;
    height: 100%;
    background: transparent;
  }
`;

const Pointer = styled.span`
  width: 0;
  height: 0;
  border: 10px solid transparent;
  border-right: 12px solid #fff;
  position: absolute;
  left: -22px;
  top: 24px;
`;

const QRCodeLogo = styled.div`
  width: 20px;
  height: 20px;
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAADe0lEQVRYR92ZPWgUQRTH/283dyFXpLSJivEjlTaKCIIIGlOIFvGDWKTTJmKVcJk5CIRgyM7miCCKNtqlUBK1UBBMFGwCFtqYQoyaoAaxTXEH9/Vklrtjc+budm9vQ5Jt7lh2//Pbt2/e/OctKaXuALgFIIIGDiLKM/MLKeVV9+1KqRki6mVmswFZfUsWwH1SSmUahXMPnMvldo+MjKzqc+Pj4x0tLS2/GwRz35bVgFw8o3+XdUS8CDMzAegE4ESImTsTicSK/m9Z1j4iWi7qaD2tWxqnpnwx4lpX68MN+ENKecALXOkapdRbAGfqAL6TUp71qfsdwP51gES0JITo8in0BsC5OoBzUsoeP7q2bX9l5kPbHzCZTHbn8/kBIooS0fTw8PDTipnaUAQnJyf7mLmfmTOmaT6Mx+Pzbl1PESzCaQAnWZ1wE90QQjx25aBvQNu2rzPzIxcQm6bZ44b0BKiUegbgkvvJiOiTEOJYQMCPzHy0IiefSykvl855ArRt+yUzX6gAXBRCHAkI+JmZD1fovhJCXPQFqPOkUCg8qRCSQgg7IKBgZuXWNQzjmju/PUVQC+h8AXATQBTAdCqVSo6NjRWCAI6OjhqxWCwOoB+AXsUeuPO6OO4OKTP1iqtSyvcsrqdZNYIAvkkpnert9bAsa46IuvX11dZiZp5PJBLOauP1UEotATjolDaXWdCL+nsAns0CEZ0EEKsFCCDFzAtezULRfJwumRCybTsXwLOVgxKJRPYODQ390iempqb2ZLPZn14jVu067aw04AwzXwko9iGdTp8szXA9U9va2hYAnAioO+ssY9pgmqbZkKOORqP5tbW1VXf50Zoasr29vSOTyTTkqPP5fFYb4PI6G/BJQ7t9ewBuhVfc2tr6d3BwMF1KOf3rvOItNEnOSylfVxTq2a1UZv4DdMrMJhRqrxNoowiuW0lCWeq80gGoDRjirs4r4w4EbJJhDSeCTbT8X3QTyLFORKeYua8K8T0iWiw6o9sAdq2zW5U5GMamSSk1oC2+15DWBAxj29lUwDA27hMTE12mafqyYOVCvVGZCav10ZRX7EUkrE2Te+yaEawH6RfQsqxewzD0nrh0/BFCOC0Py7KOG4Zxt3LMzWhglvuDG0ySFSml7qaimE5ztQDDagEHBgy7iR4E0Gmih/0ZQveonRawz1fsfIb4ByDV3/tmw0m8AAAAAElFTkSuQmCC);
  background-repeat: no-repeat;
  background-size: contain;
`;

export const QRCodes = () => {
  const [isHover, setIsHover] = useState(false);

  return (
    <>
      <Icon
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <QRCodeLogo />
        {isHover ? (
          <QRContainer>
            <Pointer></Pointer>
            <Label>
              下载简书app，
              <br />
              把文字装进口袋
            </Label>
            <QRCode
              size={116}
              bgColor="#fff"
              fgColor="#000"
              level="L"
              includeMargin={true}
              imageSettings={{
                src: "/logo.png",
                height: 24,
                width: 24,
                excavate: true,
              }}
              value="https://www.jianshu.com/apps/redirect?utm_source=index&utm_from=pc&utm_placement=note_bottom_downloadbutton"
            />
          </QRContainer>
        ) : null}
      </Icon>
      <div className="text">更多好文</div>
    </>
  );
};
