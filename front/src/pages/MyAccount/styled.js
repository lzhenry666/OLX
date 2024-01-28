import styled from 'styled-components';

export const SearchArea = styled.div`
    background-color:#DDD;
    border-bottom:1px solid #CCC;
    padding:20px 0;

    .searchBox {
        background-color:#9BB83C;
        padding:20px 15px;
        border-radius:5px;
        box-shadow:1px 1px 1px 0.3px rgba(0,0,0,0.2);
        display:flex;

        form{
            flex:1;
            display:flex;

            input, select {
                height:40px;
                border:0;
                border-radius:5px;
                outline:0;
                font-size:15px;
                color:#000;
                margin-right:20px;
            }

            input {
                flex:1;
                padding: 0 10px;
            }

            select{
                width: 100px;
            }

            button {
                background-color:#40AEEF;
                font-size:15px;
                border:0;
                border-radius: 5px;
                color:#FFF;
                height:40px;
                padding:0 20px;
                cursor:pointer;

                &:hover {
                    color:#e0dddd;
                    background-color:#2686bf;
                }

            }


        }
    }

    .categoryList {
        display:flex;
        flex-wrap:wrap;
        margin-top:20px;

        .categoryItem {
            width:25%;
            display:flex;
            align-items:center;
            color:#000;
            text-decoration:none;
            height:50px;
            margin-bottom:10px;

            &:hover {
                color:#999;
            }

            img {
                width: 45px;
                height: 45px;
                margin-right: 10px;
            }
        }
    }

`;

export const PageArea = styled.div`

h2 {
    font-size:20px;
}

.list {
    display:flex;
    flex-wrap:wrap;

    .aditem {
        width:25%;
    }
}

.seeAllLink {
    color:#000;
    text-decoration:none;
    font-weight:bold;
    display:inline-block;
}

.inputGroup {
    font-family: 'Segoe UI', sans-serif;
    margin: 3em 0 5em 0;
    max-width:20vw;
  }

  .inputGroup input {
    font-size: 100%;
    width: 100%;
    padding: 0.8em;
    outline: none;
    border: 2px solid rgb(200, 200, 200);
    background-color: transparent;
    border-radius: 20px;
    margin-bottom: 3rem;
}

  .inputGroup label {
    font-size: 100%;
    left: 0;
    padding: 0.8em;
    margin-left: 0.5em;
    margin-bottom: 40.8em;
    pointer-events: none;
    transition: all 0.3s ease;
    color: rgb(100, 100, 100);
    margin-bottom: 3rem;

  }

  .inputGroup :is(input:focus, input:valid)~label {
    transform: translateY(-50%) scale(.9);
    margin: 0em;
    margin-left: 1.3em;

    padding: 0.4em;
    background-color: #e8e8e8;
  }

  .inputGroup :is(input:focus, input:valid) {
    border-color: rgb(150, 150, 200);
  }
  .button {
    width: 150px;
    padding: 0;
    border: none;
    transform: rotate(5deg);
    transform-origin: center;
    font-family: "Gochi Hand", cursive;
    text-decoration: none;
    font-size: 15px;
    cursor: pointer;
    padding-bottom: 3px;
    border-radius: 5px;
    box-shadow: 0 2px 0 #494a4b;
    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    background-color: #5cdb95;
  }

  .button span {
    background: #f1f5f8;
    display: block;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    border: 2px solid #494a4b;
  }

  .button:active {
    transform: translateY(5px);
    padding-bottom: 0px;
    outline: 0;
  }

`;
