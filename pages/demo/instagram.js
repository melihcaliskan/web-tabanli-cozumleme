import React, { useState, useEffect } from 'react';

export default function Instagram() {
    const [response, setResponse] = useState(null);

    const fetchData = () => {
        fetch("/api/demo/instagram")
            .then(res => res.json())
            .then(response => {
                setResponse(response)
            })
            .catch(error => {
                console.log(error)
            });
    }
    fetchData(() => {
        // Update the document title using the browser API
        document.title = `You clicked ${count} times`;
    });
    return (
        <div>
            <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,700" rel="stylesheet" />
            <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.min.css' />
            <link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css' />
            <link rel='stylesheet' href='https://tympanus.net/Development/ButtonComponentMorph/css/content.css' />
            <link rel='stylesheet' href='https://tympanus.net/Development/ButtonComponentMorph/css/component.css' />
            <link rel="stylesheet" href="/styles/instagram.css" />

            <header>
                <div class="container">
                    <div class="row">
                        <div class="col-xs-12 col-sm-4 header-logo">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/2000px-Instagram_logo.svg.png" alt="" />
                        </div>

                        <div class="col-xs-12 col-sm-4 header-search">
                            <input type="text" name="Search" placeholder="Search" />
                        </div>

                        <div class="col-xs-12 col-sm-4 header-buttons">
                            <a href="#" class="button button-blue">Uygulamayı Edin</a>

                            <div class="morph-button morph-button-modal morph-button-modal-2 morph-button-fixed">
                                <button type="button">Giriş Yap</button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <div class="user-info">
                <div class="container">
                    <div class="row">
                        <div class="col-xs-12 col-sm-3 profile-photo">
                            <div class="img-wrapper">
                                <img src="https://scontent-frx5-1.cdninstagram.com/vp/ffd9c160a1d61fb2eab95d1ce553744f/5C85BB39/t51.2885-19/s150x150/23421635_1355016614620383_2372662405302845440_n.jpg" alt="" />
                            </div>
                        </div>

                        <div class="col-xs-12 col-sm-9">
                            <div class="follow">
                                <p>besiktas</p>
                                <a href="javascript:void(0);" data-text="UNFOLLOW" class="button button-white follow">Takip Et</a>
                            </div>
                            <div class="user-stats">
                                <div>
                                    <b>8.963</b> Posts
                                </div>
                                <div>
                                    <b>3m</b> Followers
                                </div>
                                <div>
                                    <b>313</b> Following
                                </div>
                            </div>
                            <div class="user-biography">
                                <b>Beşiktaş J.K.</b>
                                Beşiktaş JK Resmi Instagram Hesabı / The Official Instagram Account of Beşiktaş JK <a href="#">www.bjk.com.tr</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="photo-grid">
                <div class="container">
                    <div class="row">
                        {response && response.map((item, index) => (
                            <div class="col-xs-12 col-sm-4 grid">
                                <img style={{ height: 300, width: 300 }} src={item.url} alt={item.description} />
                                <div class="overlay">
                                    <div class="likes">
                                        <i class="fa fa-heart"></i>{item.likes}
                                    </div>
                                    <div class="comments">
                                        <i class="fa fa-comment"></i>{item.comments}
                                    </div>
                                </div>
                                <div className="bg-green-100 p-3">
                                    <p>{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div class="load-more">
                <span>Devamını Yükle</span>
            </div>
            <script src='https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.0/jquery.min.js'></script>
            <script src='https://tympanus.net/Development/ButtonComponentMorph/js/classie.js'></script>
            <script src='https://tympanus.net/Development/ButtonComponentMorph/js/modernizr.custom.js'></script>
            <script src="/scripts/instagram.js"></script>
        </div>
    )
}
