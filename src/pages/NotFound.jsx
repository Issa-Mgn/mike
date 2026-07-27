import { Link } from 'react-router-dom';
import './NotFound.css';

export default function NotFound() {
  return (
    <div className="notfound-wrapper">
      <div className="notfound-content">
        <div className="main_wrapper_404">
          <div className="main_404">
            <div className="antenna_404">
              <div className="antenna_shadow_404" />
              <div className="a1_404" />
              <div className="a1d_404" />
              <div className="a2_404" />
              <div className="a2d_404" />
            </div>
            <div className="tv_404">
              <div className="cruve_404">
                <svg className="curve_svg_404" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 189.929 189.929" xmlSpace="preserve">
                  <path d="M70.343,70.343c-30.554,30.553-44.806,72.7-39.102,115.635l-29.738,3.951C-5.442,137.659,11.917,86.34,49.129,49.13C86.34,11.918,137.664-5.445,189.928,1.502l-3.95,29.738C143.041,25.54,100.895,39.789,70.343,70.343z" />
                </svg>
              </div>
              <div className="display_div_404">
                <div className="screen_out_404">
                  <div className="screen_out1_404">
                    <div className="screen_404 screen_desktop">
                      <span className="notfound_text_404">NOT FOUND</span>
                    </div>
                    <div className="screenM_404 screen_mobile">
                      <span className="notfound_text_404">NOT FOUND</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lines_404">
                <div className="line1_404" />
                <div className="line2_404" />
                <div className="line3_404" />
              </div>
              <div className="buttons_div_404">
                <div className="b1_404">
                  <div />
                </div>
                <div className="b2_404" />
                <div className="speakers_404">
                  <div className="g1_404">
                    <div className="g11_404" />
                    <div className="g12_404" />
                    <div className="g13_404" />
                  </div>
                  <div className="g_404" />
                  <div className="g_404" />
                </div>
              </div>
            </div>
            <div className="bottom_404">
              <div className="base1_404" />
              <div className="base2_404" />
              <div className="base3_404" />
            </div>
          </div>
          <div className="text_404_bg">
            <div className="text_4041">4</div>
            <div className="text_4042">0</div>
            <div className="text_4043">4</div>
          </div>
        </div>
        
        <Link to="/" className="back-home-btn">
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
}
