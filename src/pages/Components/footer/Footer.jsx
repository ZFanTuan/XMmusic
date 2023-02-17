import React, { memo } from 'react'
import FooterStyle from './Footer.module.less'

const Footer = memo(() => {

  const texts = ['服务条款', '隐私政策', '儿童隐私政策', '版权投诉', ' 投资者关系', '广告合作 ', '联系我们']
  return (
    <div className={FooterStyle.footer} >
      <div className={FooterStyle.content}>
        <div className={FooterStyle.icons}>
          <div className={FooterStyle.icon1}>
            <div></div>
            <span>音乐开放平台</span>
          </div>
          <div className={FooterStyle.icon2}>
            <div></div>
            <span>云村交易所</span>
          </div>
          <div className={FooterStyle.icon3}>
            <div></div>
            <span>Amped Studio</span>
          </div>
          <div className={FooterStyle.icon4}>
            <div></div>
            <span>用户认证</span>
          </div>
          <div className={FooterStyle.icon5}>
            <div></div>
            <span>音乐交易平台</span>
          </div>
          <div className={FooterStyle.icon6}>
            <div></div>
            <span>赞赏</span>
          </div>
          <div className={FooterStyle.icon7}>
            <div></div>
            <span>视频激励</span>
          </div>
        </div>
        <div className={FooterStyle.texts}>
          <div>
            <p>
              {
                texts.map((item, index) => {
                  return <>
                    <a href="#">{item}</a>
                    <span style={texts.length === index + 1 ? { display: 'none' } : {}}>|</span>
                  </>
                })
              }
            </p>
            <p>廉正举报 不良信息举报邮箱: 51jubao@service.netease.com 客服热线：95163298</p>
            <p>互联网宗教信息服务许可证：浙（2022）0000120 增值电信业务经营许可证：浙B2-20150198 粤B2-20090191-18  工业和信息化部备案管理系统网站</p>
            <p>网易公司版权所有©1997-2023杭州乐读科技有限公司运营：浙网文[2021] 1186-054号  浙公网安备 33010902002564号</p>
          </div>
        </div>
      </div>
    </div>
  )
})

export default Footer