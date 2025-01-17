import React, { useState } from 'react'
import Card from '@material-ui/core/Card'
import PropTypes from 'prop-types'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'
import LinearProgress from '@material-ui/core/LinearProgress'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/styles'

import DropzoneBase from '../common'

import Styles from './styles'
import FileComponent from './FileComponent'

const useStyles = makeStyles(Styles)

const DropzoneHash = ({ file, handleOnDropFile, deleteFile }) => {
  const [progress, setProgress] = useState(0)
  const classes = useStyles()

  const handleFileDeletion = () => {
    deleteFile()
    handleOnDropFile(null)
  }
  return (
    <Grid item xs={12}>
      <Card>
        <CardContent>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="center"
            alignContent="center"
          >
            <Box className={classes.dropzoneBox}>
              {file === null && (
                <DropzoneBase
                  fileChange={(f) => handleOnDropFile(f)}
                  progressChange={(p) => setProgress(p)}
                />
              )}
              {progress > 0 && progress < 100 && (
                <Box display="flex" alignItems="center">
                  <Box width="100%" mr={1}>
                    <LinearProgress variant="determinate" value={progress} />
                  </Box>
                  <Box minWidth={35}>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                    >{`${Math.round(progress)}%`}</Typography>
                  </Box>
                </Box>
              )}

              {file !== null && (
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                >
                  <FileComponent
                    onClick={handleFileDeletion}
                    filehash={file.filehash}
                    filesize={file.filesize}
                    filename={file.filename}
                    lastModifiedDate={file.lastModifiedDate}
                  >
                    {file.name}
                  </FileComponent>
                  <br />
                </Box>
              )}
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  )
}

DropzoneHash.propTypes = {
  handleOnDropFile: PropTypes.func,
  file: PropTypes.object,
  deleteFile: PropTypes.func
}

DropzoneHash.defaultProps = {
  handleOnDropFile: () => {}
}

export default DropzoneHash
