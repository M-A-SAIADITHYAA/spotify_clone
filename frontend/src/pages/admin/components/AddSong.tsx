import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { axiosInstance } from "@/lib/axios";
import { useMusicStore } from "@/stores/useMusicStore";

import { Plus, Upload } from "lucide-react";

import  { useRef, useState } from "react";
import toast from "react-hot-toast";

const AddSong = () => {
  const { albums } = useMusicStore();
  const [songDialoagOpen, setsongDialogOpen] = useState(false);
  const [isLoading, setisLoading] = useState(false);

  const [newSong, setNewSong] = useState({
    title: "",
    artist: "",
    album:"",
    duration: "0",
  });

  const [files, setFiles] = useState<{
    audio: File | null;
    image: File | null;
  }>({
    audio: null,
    image: null,
  });

  const audioImputRef = useRef<HTMLInputElement>(null);
  const imageImputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async () => {

    setisLoading(true)
    
    try {
     if(!files.audio || !files.image){
        return toast.error("Upload image and audio file");
        
      }
      

      const formData = new FormData()

      formData.append("title",newSong.title)
      formData.append("artist",newSong.artist)
      formData.append("duration",newSong.duration)

      if(newSong.album && newSong.album!=="none"){
        formData.append("albumId",newSong.album)
      }
      

      formData.append("audioFile",files.audio)
      formData.append("imageFile",files.image)

      await axiosInstance.post("/admin/songs",formData,{
        headers:{
          "Content-Type":"multipart/form-data"
        }
      })

      setNewSong({
        title:"",
        artist:"",
        album:"",
        duration:"0"
      })

      setFiles({
        audio:null,
        image:null
      }

      )
            toast.success("successfully added the song")
           

      
    } catch (error) {
      console.log(error)
      toast.error("Error uploading song ")
      
    } finally{

      setisLoading(false)

    }
  };
  return (
    
    <Dialog open={songDialoagOpen} onOpenChange={setsongDialogOpen}>
      <DialogTrigger asChild>
        <Button className="bg-emerald-500 hover:bg-emerald-300 text-black">
          <Plus className="size-5 mr-2" />
          Add song
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-zinc-900 border-zinc-700 text-white max-h-[80vh] overflow-hidden gap-4">
        <ScrollArea className="h-[58vh] px-6 py-4 ">
        <DialogHeader>
          <DialogTitle>Add New Song</DialogTitle>
          <DialogDescription>
            Add a new song to your music library
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4 ">
          <input
            type="file"
            accept="audio/*"
            hidden
            ref={audioImputRef}
            onChange={(e) =>
              setFiles((prev) => ({ ...prev, audio: e.target.files![0] }))
            }
          />
          <input
            type="file"
            accept="image/*"
            hidden
            ref={imageImputRef}
            onChange={(e) =>
              setFiles((prev) => ({ ...prev, image: e.target.files![0] }))
            }
          />
        </div>

        <div
          className="flex items-center justify-center p-6 border-2 border-dashed border-zinc-700 rounded-lg cursor-pointer"
          onClick={() => imageImputRef.current?.click()}
        >
          <div className="text-center">
            {files.image ? (
              <div className="space-y-2">
                <img src="files.image" alt="" />
                <div className="text-sm text-emerald-500">Image selected:</div>
                <div className="text-xs text-zinc-400">
                  {files.image.name.slice(0, 20)}
                </div>
              </div>
            ) : (
              <>
                <div className="p-3 bg-zinc-800 rounded-full inline-block mb-2">
                  <Upload className="h-6 w-6 text-zinc-400" />
                </div>
                <div className="text-sm text-zinc-400 mb-2">Upload artwork</div>
                <Button variant="outline" size="sm" className="text-xs">
                  Choose File
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Audio upload */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Audio File</label>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => audioImputRef.current?.click()}
              className="w-full"
            >
              {files.audio
                ? files.audio.name.slice(0, 20)
                : "Choose Audio File"}
            </Button>
          </div>
        </div>
        <div className='space-y-2'>
						<label className='text-sm font-medium'>Title</label>
						<Input
							value={newSong.title}
							onChange={(e) => setNewSong({ ...newSong, title: e.target.value })}
							className='bg-zinc-800 border-zinc-700'
						/>
				</div>

					<div className='space-y-2'>
						<label className='text-sm font-medium'>Artist</label>
						<Input
							value={newSong.artist}
							onChange={(e) => setNewSong({ ...newSong, artist: e.target.value })}
							className='bg-zinc-800 border-zinc-700'
						/>
					</div>

                    <div className='space-y-2'>
						<label className='text-sm font-medium'>Duration (seconds)</label>
						<Input
							type='number'
							min='0'
							value={newSong.duration}
							onChange={(e) => setNewSong({ ...newSong, duration: e.target.value || "0" })}
							className='bg-zinc-800 border-zinc-700'
						/>
					</div>

					<div className='space-y-2'>
						<label className='text-sm font-medium'>Album (Optional)</label>
						<Select 
							value={newSong.album}
							onValueChange={(value) => setNewSong({ ...newSong, album: value })}
						>
							<SelectTrigger className='bg-zinc-800 border-zinc-700'>
								<SelectValue placeholder='Select album' />
							</SelectTrigger>
							<SelectContent className='bg-zinc-800 border-zinc-700 text-white'>
								<SelectItem value='none'>No Album (Single)</SelectItem>
								{albums.map((album) => (
									<SelectItem key={album._id} value={album._id}>
										{album.title} 
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
				
                <DialogFooter>
					<Button variant='outline' onClick={() => setsongDialogOpen(false)} disabled={isLoading}>
						Cancel
					</Button>
					<Button onClick={handleSubmit} disabled={isLoading}>
						{isLoading ? "Uploading..." : "Add Song"}
					</Button>
				</DialogFooter>
                </ScrollArea>
      </DialogContent>
    </Dialog>
    
  );
};

export default AddSong;
