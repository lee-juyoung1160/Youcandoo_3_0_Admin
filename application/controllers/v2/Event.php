<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Event extends MY_Controller {

    public function index()
        {
            $this->load->template('v2/event/event-list');
        }
    public function create()
        {
            $this->load->template('v2/event/event-create');
        }
    public function detail()
        {
            $this->load->template('v2/event/event-detail');
        }
    public function update()
        {
            $this->load->template('v2/event/event-update');
        }
}


