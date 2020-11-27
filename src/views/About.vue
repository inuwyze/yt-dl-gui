<template>
<div>
  <pre class="about">
249          webm       audio only tiny   67k , opus @ 50k (48000Hz), 3.88MiB
250          webm       audio only tiny   86k , opus @ 70k (48000Hz), 5.03MiB
140          m4a        audio only tiny  130k , m4a_dash container, mp4a.40.2@128k (44100Hz), 9.74MiB
251          webm       audio only tiny  161k , opus @160k (48000Hz), 9.73MiB
160          mp4        256x144    144p   79k , avc1.4d400c, 30fps, video only, 1.41MiB
278          webm       256x144    144p   83k , webm container, vp9, 30fps, video only, 2.74MiB
133          mp4        426x240    240p  162k , avc1.4d4015, 30fps, video only, 2.53MiB
242          webm       426x240    240p  188k , vp9, 30fps, video only, 3.78MiB
134          mp4        640x360    360p  303k , avc1.4d401e, 30fps, video only, 4.05MiB
243          webm       640x360    360p  355k , vp9, 30fps, video only, 6.86MiB
135          mp4        854x480    480p  544k , avc1.4d401f, 30fps, video only, 5.91MiB
244          webm       854x480    480p  635k , vp9, 30fps, video only, 10.64MiB
136          mp4        1280x720   720p 1046k , avc1.4d401f, 30fps, video only, 8.33MiB
247          webm       1280x720   720p 1228k , vp9, 30fps, video only, 18.57MiB
298          mp4        1280x720   720p60 1827k , avc1.4d4020, 60fps, video only, 21.54MiB
302          webm       1280x720   720p60 1968k , vp9, 60fps, video only, 24.25MiB
299          mp4        1920x1080  1080p60 2998k , avc1.64002a, 60fps, video only, 34.84MiB
303          webm       1920x1080  1080p60 3707k , vp9, 60fps, video only, 44.65MiB
308          webm       2560x1440  1440p60 11515k , vp9, 60fps, video only, 133.13MiB
22           mp4        1280x720   720p  239k , avc1.64001F, 30fps, mp4a.40.2@192k (44100Hz)
18           mp4        640x360    360p  297k , avc1.42001E, 30fps, mp4a.40.2@ 96k (44100Hz), 22.42MiB 
  </pre>

{{destination_folder}}
{{preferences}}


  </div>
</template>

<script>

import { mapState } from 'vuex'
export default {
  data () {
    return {
     
    }
  },
  computed: {
    ...mapState(['destination_folder','preferences']),
  }
}
</script>