```
[
  { level: 1, label: 'item 1' },
  { level: 1, label: 'item 2' },
  { level: 4, label: 'item 3' },
  { level: 2, label: 'item 4' },
  { level: 3, label: 'item 5' },
  { level: 4, label: 'item 6' },
]
```

```
<ul>
  <li>
    <ul>
      <li>item 1</li>
    </ul>
  </li>
  <li>
    <ul>
      <li>item 2</li>
    </ul>
  </li>
  <li>
    <ul>
      <li>
        <ul>
          <li>
            <ul>
              <li>
                <ul>
                  <li>item 3</li>
                </ul>
              </li>
              <li>
                <ul>
                  <li>item 6</li>
                </ul>
              </li>
            </ul>
          </li>
          <li>
            <ul>
              <li>item 5</li>
            </ul>
          </li>
        </ul>
      </li>
      <li>
        <ul>
          <li>item 4</li>
        </ul>
      </li>
    </ul>
  </li>
</ul>
```