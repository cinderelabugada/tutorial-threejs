import {
  BoxGeometry,
  Mesh,
  MeshBasicMaterial,
  DoubleSide
} from 'three'

// gera numero aleatório entre min e max
export function getRandomInterval(min, max, sign) {
  if (sign) {
    return sign * (
      Math.random() * (max - min) + min
    )
  } 

  return (Math.random() * (max - min) + min)
          * (Math.random() >= 0.5 ? -1 : 1)
}

export function getRandomCoords(min, max, sign=false) {
  const x = getRandomInterval(min, max, sign)
  const y = getRandomInterval(min, max, sign)
  const z = getRandomInterval(min, max, sign)

  return [x, y, z]
}

export function addObjectsOnScene(scene, arr) {
  arr.forEach(p => scene.add(p.threejs))
}

export function randomPositionItems(
  n,
  minCoord,
  maxCoord,
  mesh
) {
    return Array.from(Array(n))
      .map((_, idx) => {
        const object = {}
        object.threejs = mesh.clone()
        const x = getRandomInterval(
          minCoord,
          maxCoord
        )
        const y = 0
        const z = getRandomInterval(
          minCoord,
          maxCoord
        )

        object.threejs.position.set(x, y, z)

        return object
      })
  }
