import { Button } from "@/components/ui/button";
import { useMusicStore } from "@/stores/useMusicStore";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Clock, Music, Pause, Play, PlayIcon } from "lucide-react";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
;
// const {currentAlbum} = useMusicStore()

// import {} from usePlayerStore
import { usePlayerStore } from "@/stores/usePlayerStore"

export const  formatDuration = (duration:number)=>{
    const minutes = Math.floor(duration/60)
    const sec = duration%60
    return `${minutes}:${sec}`
} 


const AlbumPage = () => {
  const { albumId } = useParams();
  const {isPlaying,currentSong,playAlbum,togglePlay} = usePlayerStore()

  const { fetchAlbumById, currentAlbum, isLoading } = useMusicStore();



  useEffect(() => {
    if (albumId) fetchAlbumById(albumId);
  }, [fetchAlbumById, albumId]);

  if (isLoading) {
    return null;
  }

  const handlePlayAlbum = () => {
if (!currentAlbum) return;
const isCurrentAlbumPlaying = currentAlbum?.songs.some ((song) => song._id=== currentSong?._id);
if (isCurrentAlbumPlaying) togglePlay();
else {
// start playing the album from the beginning
playAlbum(currentAlbum?.songs, 0);
}
  }
  const handlePlaySong = (index:number) =>{

  if(!currentAlbum){
    return 
  }

  playAlbum(currentAlbum?.songs,index)
}

  return (
    <div className="h-full">
      <ScrollArea className="h-full">
       
        <div className="relative min-h-full">
          <div
            className="absolute inset-0 bg-gradient-to-b from-[#5028a0]/80 via-zinc-900/70 
                to-zinc-900 pointer-events-none "
            aria-hidden="true"
          />

          <div className="relative z-10">
            <div className=" flex p-6 gap-8 pb-8">
              <img
                src={currentAlbum?.imageUrl}
                alt=""
                className="w-[240px] h-[240]px shadow-xl rounded"
              />
              <div className="flex flex-col justify-end">
                <p className="text-sm font-extrabold">Album</p>
                <h2 className="text-6xl font-extrabold my-4">
                  {currentAlbum?.title}
                </h2>
                <div className="flex flex-row items-center text-sm gap-2 text-zinc-100">
                  <span className="font-light text-white ">
                    {currentAlbum?.artist}
                  </span>
                  <span className="font-light text-white ">
                    {currentAlbum?.songs.length} Songs
                  </span>
                  <span className="font-light text-white ">
                    {currentAlbum?.releaseYear}
                  </span>
                </div>
              </div>
            </div>
            {/*control button*/}
            
            <div className="flex px-6 pb-4 items-center gap-6">
              <Button
              onClick={handlePlayAlbum}
                size="icon"
                className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-400 hover: scale-105 transition-all"
              >
                
                {isPlaying && currentAlbum?.songs.some((song)=>song._id === currentSong?._id)?
                (
                  <Pause className="h-7 w-7 text-black"/>
                ):(
                  <Play className="h-7 w-7 text-black"></Play>
                )
                }
              </Button>
            </div>
            <div className="bg-black/20">
            <ScrollArea>
              <Table className="border-separate border-spacing-0">
                <TableHeader>
                  <TableRow>
                    <TableHead>#</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Released Date</TableHead>
                    <TableHead>
                      <Clock />
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody >
                  {currentAlbum?.songs.map((song, index) => {
                    const iscurrentSong = currentSong?._id == song?._id
                    return(
                    <TableRow className="group hover:bg-zinc-700" key={song._id} onClick={()=> handlePlaySong(index)}>
                       <TableCell className="w-5">
          {iscurrentSong && isPlaying ? (
            <Music className="p-1 pb-1 m-3 hidden group-hover:flex justify-center items-center h-6 w-6" />
          ) : (
            <span className="group-hover:hidden">{index + 1}</span>
          )}
          {!iscurrentSong && (
            <PlayIcon className="p-1 pb-1 m-3 hidden group-hover:flex justify-center items-center h-6 w-6" />
          )}
        </TableCell>
                      
                      

                      
                      <TableCell className="p-0" >
                        <div className="flex flex-row w-full h-full items-center">
                          <img src={song.imageUrl} className="size-10 m-2" />
                          

                          <div className="flex flex-col">
                            <span className="text-white font-extrabold">
                              {song.title}
                            </span>
                            <span className="text-white truncate">
                              {song.artist}
                            </span>
                          </div>
                        </div>
                      </TableCell>

                      <TableCell>
                        <div className="flex items-center">{song.createdAt.split("T")[0]}</div>
                      </TableCell>
                      <TableCell>{formatDuration(song.duration)}</TableCell>
                    </TableRow>
)})}
                </TableBody>
              </Table>
              </ScrollArea>
            </div>
          </div>
        </div>
      </ScrollArea>*/
    </div>
  );

  return <div>AlbumPage</div>;
};

export default AlbumPage;
