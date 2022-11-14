import config from '../config.json'
import styled from 'styled-components'
import Menu from '../src/components/Menu'
import { StyledTimeline } from '../src/components/Timeline'
import React from 'react'
import { videoService } from '../src/services/videoService'

function HomePage() {
  const service = videoService()
  const [valorDoFiltro, setValorDoFiltro] = React.useState('')
  const [playlists, setPlaylists] = React.useState({})

  React.useEffect(() => {
    service.getAllVideos().then((dados) => {
      const novasPlaylists = { ...playlists }
      dados.data.forEach((video) => {
        if (!novasPlaylists[video.playlist]) {
          novasPlaylists[video.playlist] = []
        }
        novasPlaylists[video.playlist]?.push(video)
      })
      setPlaylists(novasPlaylists)
    })
  }, [])

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          // backgroundColor: "red",
        }}
      >
        {/* Prop Drilling */}
        <Menu
          valorDoFiltro={valorDoFiltro}
          setValorDoFiltro={setValorDoFiltro}
        />
        <Header />
        <Timeline searchValue={valorDoFiltro} playlists={playlists} />
      </div>
    </>
  )
}

const StyledHeader = styled.div`
  background-color: ${({ theme }) => theme.backgroundLevel1};
  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }
  .user-info {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 16px 32px;
    gap: 16px;
  }
`
const StyledBanner = styled.div`
  background-color: blue;
  background-image: url(${({ bg }) => bg});
  /* background-image: url(${config.bg}); */
  height: 230px;
`

function Header() {
  return (
    <StyledHeader>
      <StyledBanner bg={config.bg} />
      <section className="user-info">
        <img src={`https://github.com/${config.github}.png`} />
        <div>
          <h2>{config.name}</h2>
          <p>{config.job}</p>
        </div>
      </section>
    </StyledHeader>
  )
}

function Timeline({ searchValue, ...props }) {
  // console.log('Dentro do componente', props.playlists)
  const playlistNames = Object.keys(props.playlists)
  return (
    <StyledTimeline>
      {playlistNames.map((playlistName) => {
        const videos = props.playlists[playlistName]
        return (
          <section key={playlistName}>
            <h2>{playlistName}</h2>
            <div>
              {videos
                .filter((video) => {
                  const titleNormalized = video.title.toLowerCase()
                  const searchValueNormalized = searchValue.toLowerCase()
                  return titleNormalized.includes(searchValueNormalized)
                })
                .map((video) => {
                  return (
                    <a key={video.url} href={video.url}>
                      <img src={video.thumb} />
                      <span>{video.title}</span>
                    </a>
                  )
                })}
            </div>
          </section>
        )
      })}
    </StyledTimeline>
  )
}

export default HomePage
