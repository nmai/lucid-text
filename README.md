# lucid-text
the world's most bestest text thing

# notes

### hooking into the dom: here's some thoughts

Let's use a vanilla TextArea. We can make our own data binding directly to Lucid, and vice versa. This will allow us maximum control and optimal performance.

1. Construct an instance of Lucid. Initialize with any existing text in the textarea, if any.

2. Listen for `keyup` and `paste`. Pass these events to Lucid along with:
  * `selectionStart`        | int
  * `selectionEnd`          | int
  * `selectionDirection`    | string ('forward' or 'backward')

3. Create an operational transform for every event. We don't need the string length or anything, because we can assume the snapshot matches the value of textarea.

4. There's a queue of pending changes. The oldest change in the stack exists at index 0. All new changes are pushed to the top. However, this is where we can run into semantic issues. A "change" in this context is different than before, because these are essentially bundles that are waiting to be sent off to the server. When certain conditions are met, we stop saving to the latest "change" and create a new one higher up in the stack. At this point, the older one is ready to be sent.

So let's assume we have a rule that says "every 5 characters, we send to the server". Until that 5 character limit is hit, we don't create a new change in the pending array. Instead, we generate the operational transform as usual, then apply it to the current change. We keep transforming our changes until we're ready to send it out.

5. Send to the server. Now, Lucid does need a revision number when connecting to the transport API. In this case, we assume the revision given by the server is `0`, meaning it's a brand new document. `JSON.stringify()` is applied to the change, and we send that up.

6. The server generates the OT object from the JSON data and checks the revision number given by the client. The server has a persistent revision history.

If the revision number doesn't collide with anything, the server applies the operational transform to the current snapshot and saves it to the revision history. It sends an acknowledgment with the given revision number.

If the revision number does collide, the server takes all existing transforms from that point on and applies them to the pending change. Then it accepts it as the latest revision number, and sends an acknowledgment with the latest revision number. It only needs to send an acknowledgement, because before this the other change was sent out to the client and transformed there.

7. When a client receives a colliding change, it applies the transform starting from the oldest to the newest pending change. THEN it can save it with an incremented revision number, but only when it receives acknowledgment from the server of course.
