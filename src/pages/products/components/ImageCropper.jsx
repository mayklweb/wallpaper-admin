import React, { useState, useCallback } from 'react'
import ReactDOM from 'react-dom'
import Cropper from 'react-easy-crop'
import { getOrientation } from 'get-orientation/browser'
import ImgDialog from './ImgDialog'
import { getCroppedImg, getRotatedImage } from './canvasUtils'
import { styles } from './styles'

import { withStyles } from '@material-ui/core/styles'
import CloseIcon from '@material-ui/icons/Close'
import { Button, Typography, IconButton } from '@mui/joy'


const Demo = ({ classes }) => {
  const [imageSrc, setImageSrc] = React.useState(null)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [rotation, setRotation] = useState(0)
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const [croppedImage, setCroppedImage] = useState(null)

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }

  const showCroppedImage = async () => {
    try {
      const croppedImage = await getCroppedImg(
        imageSrc,
        croppedAreaPixels,
        rotation
      )
      console.log('donee', { croppedImage })
      setCroppedImage(croppedImage)
    } catch (e) {
      console.error(e)
    }
  }

  const onClose = () => {
    setCroppedImage(null)
  }

  const onFileChange = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      let imageDataUrl = await readFile(file)

      try {
        // apply rotation if needed
        const orientation = await getOrientation(file)

      } catch (e) {
        console.warn('failed to detect the orientation')
      }

      setImageSrc(imageDataUrl)
    }
  }

  return (
    <div>
      {imageSrc ? (
        <React.Fragment>
          <div className={classes.cropContainer}>
            <Cropper
              image={imageSrc}
              crop={crop}
              rotation={rotation}
              zoom={zoom}
              aspect={4 / 3}
              onCropChange={setCrop}
              onRotationChange={setRotation}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
            />
          </div>
          <div className={classes.controls}>
            <Button
              onClick={showCroppedImage}
              variant="contained"
              color="primary"
              classes={{ root: classes.cropButton }}
            >
              Show Result
            </Button>
          </div>
          <ImgDialog img={croppedImage} onClose={onClose} />
        </React.Fragment>
      ) : (
        <input type="file" onChange={onFileChange} accept="image/*" />
      )}
    </div>
  )
}

function readFile(file) {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => resolve(reader.result), false)
    reader.readAsDataURL(file)
  })
}

const StyledDemo = withStyles(styles)(Demo)

const rootElement = document.getElementById('root')
ReactDOM.render(<StyledDemo />, rootElement)


getRotatedImage



function Transition(props) {
  return <Slide direction="up" {...props} />
}

class ImgDialog extends React.Component {
  state = {
    open: false,
  }

  handleClickOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  render() {
    const { classes } = this.props
    return (
      <Dialog
        fullScreen
        open={!!this.props.img}
        onClose={this.props.onClose}
        TransitionComponent={Transition}
      >
        <div>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton
                color="inherit"
                onClick={this.props.onClose}
                aria-label="Close"
              >
                <CloseIcon />
              </IconButton>
              <Typography
                variant="title"
                color="inherit"
                className={classes.flex}
              >
                Cropped image
              </Typography>
            </Toolbar>
          </AppBar>
          <div className={classes.imgContainer}>
            <img src={this.props.img} alt="Cropped" className={classes.img} />
          </div>
        </div>
      </Dialog>
    )
  }
}

export default withStyles(styles)(ImgDialog)
